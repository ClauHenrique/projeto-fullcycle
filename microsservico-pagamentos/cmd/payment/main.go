package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"

	"github.com/ClauHenrique/projeto-fullcycle/microsservico-pagamentos/internal/entity"
	"github.com/ClauHenrique/projeto-fullcycle/microsservico-pagamentos/pkg/rabbitmq"
	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {

	fmt.Println("started...")

	ctxt := context.Background()
	channel, err := rabbitmq.OpenChannel()

	if err != nil {
		panic(err)
	}

	defer channel.Close()

	msgs := make(chan amqp.Delivery)
	go rabbitmq.Consume(channel, msgs, "orders")

	for msg := range msgs {
		var orderRequest entity.OrderRequest
		err := json.Unmarshal(msg.Body, &orderRequest)
		if err != nil {
			slog.Error(err.Error())
			break
		}

		response, err := orderRequest.Process()

		if err != nil {
			slog.Error(err.Error())
			break
		}

		resJson, err := json.Marshal(response)

		if err != nil {
			slog.Error(err.Error())
			break
		}

		err = rabbitmq.Publish(ctxt, channel, string(resJson), "amq.direct")

		if err != nil {
			slog.Error(err.Error())
			break
		}

		msg.Ack(false)
		slog.Info("Order Processed")

	}

}
