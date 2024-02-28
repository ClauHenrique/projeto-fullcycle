package rabbitmq

import (
	"context"

	amqp "github.com/rabbitmq/amqp091-go"
)

func OpenChannel() (*amqp.Channel, error) {
	conn, err := amqp.Dial("amqp://admin:admin@localhost:5672/")

	if err != nil {
		panic(err)
	}

	channel, err := conn.Channel()

	if err != nil {
		panic(err)
	}

	return channel, nil
}

func Consume(channel *amqp.Channel, out chan amqp.Delivery, queue string) error {
	msgs, err := channel.Consume(
		queue,
		"go-payment",
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return err
	}

	// o laco e repetido para cada mensagem que e obtida pela funcao
	// Consume().
	// Ao receber uma mensagem, ela e mandada para o canal (out) e sera
	// processada pela thread
	for msg := range msgs {
		out <- msg
	}

	return nil
}

func Publish(ctxt context.Context, channel *amqp.Channel, body, exchangeName string) error {
	err := channel.PublishWithContext(
		ctxt,
		exchangeName,
		"PaymentDone",
		false,
		false,
		amqp.Publishing{
			ContentType: "text/json",
			Body:        []byte(body),
		},
	)
	if err != nil {
		return err
	}

	return nil
}
