package entity

import "errors"

type OrderRequest struct {
	OrderID  string  `json: "order_id"`
	CardHash string  `json: "card_hash"`
	Total    float64 `json:"total"`
}

func (order *OrderRequest) Validate() error {
	if order.OrderID == "" {
		return errors.New("order_id is required")
	}

	if order.CardHash == "" {
		return errors.New("card_hash is required")
	}

	if order.Total <= 0 {
		return errors.New("card_hash is required")
	}

	return nil
}
