package entity

import "errors"

type OrderRequest struct {
	OrderID  string  `json:"order_id"`
	CardHash string  `json:"card_hash"`
	Total    float64 `json:"total"`
}

func NewOrderRequest(orderID, cardHash string, total float64) *OrderRequest {
	return &OrderRequest{
		OrderID:  orderID,
		CardHash: cardHash,
		Total:    total,
	}
}

func (order *OrderRequest) Validate() error {
	if order.OrderID == "" {
		return errors.New("order_id is required")
	}

	if order.CardHash == "" {
		return errors.New("card_hash is required")
	}

	if order.Total <= 0 {
		return errors.New("total must be greater than 0")
	}

	return nil
}

type OrderResponse struct {
	OrderID string `json:"order_id"`
	Status  string `json:"status"`
}

func NewOrderResponse(orderID, status string) *OrderResponse {
	return &OrderResponse{
		OrderID: orderID,
		Status:  status,
	}
}

func (order *OrderRequest) Process() (*OrderResponse, error) {
	err := order.Validate()
	if err != nil {
		return nil, err
	}

	orderResponse := NewOrderResponse(order.OrderID, "failed")

	if order.Total <= 2600.00 {
		orderResponse.Status = "paid"
	}

	return orderResponse, nil
}
