package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

const index = "color~name"

type ProductTransferSmartContract struct {
	contractapi.Contract
}

type Product struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Area      string `json:"area"`
	OwnerName string `json:"ownerName"`
	Value     int    `json:"cost"`
}

type HistoryQueryResult struct {
	Record *Product `json:"record"`
	TxId   string   `json:"txId"`
}

// This function helps to Add new product
func (pc *ProductTransferSmartContract) AddProduct(ctx contractapi.TransactionContextInterface, id string, name string, area string, ownerName string, cost int) error {
	productJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return fmt.Errorf("Failed to read the data from world state", err)
	}

	if productJSON != nil {
		return fmt.Errorf("the product %s already exists", id)
	}

	prop := Product{
		ID:        id,
		Name:      name,
		Area:      area,
		OwnerName: ownerName,
		Value:     cost,
	}

	productBytes, err := json.Marshal(prop)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(id, productBytes)
}

// This function returns all the existing product
func (pc *ProductTransferSmartContract) QueryAllProducts(ctx contractapi.TransactionContextInterface) ([]*Product, error) {
	productIterator, err := ctx.GetStub().GetStateByRange("", "")
	if err != nil {
		return nil, err
	}
	defer productIterator.Close()

	var properties []*Product

	for productIterator.HasNext() {
		productResponse, err := productIterator.Next()
		if err != nil {
			return nil, err
		}

		var product *Product
		err = json.Unmarshal(productResponse.Value, &product)
		if err != nil {
			return nil, err
		}
		properties = append(properties, product)
	}

	return properties, nil
}

// This function helps to query the product by Id
func (pc *ProductTransferSmartContract) QueryProductById(ctx contractapi.TransactionContextInterface, id string) (*Product, error) {
	productJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return nil, fmt.Errorf("Failed to read the data from world state", err)
	}

	if productJSON == nil {
		return nil, fmt.Errorf("the product %s does not exist", id)
	}

	var product *Product
	err = json.Unmarshal(productJSON, &product)

	if err != nil {
		return nil, err
	}
	return product, nil
}

// This functions helps to transfer the location of the product
//change owner
//money exchange
func (pc *ProductTransferSmartContract) TransferProduct(ctx contractapi.TransactionContextInterface, id string, newArea string) error {
	product, err := pc.QueryProductById(ctx, id)
	if err != nil {
		return err
	}

	product.Area = newArea
	productJSON, err := json.Marshal(product)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(id, productJSON)

}

// GetProductHistory returns the chain of custody for an asset since issuance.
func (pc *ProductTransferSmartContract) GetProductHistory(ctx contractapi.TransactionContextInterface, id string) ([]HistoryQueryResult, error) {
	log.Printf("GetProductHistory: ID %v", id)

	resultsIterator, err := ctx.GetStub().GetHistoryForKey(id)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	var records []HistoryQueryResult
	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}

		var asset Product
		if len(response.Value) > 0 {
			err = json.Unmarshal(response.Value, &asset)
			if err != nil {
				return nil, err
			}
		} else {
			asset = Product{
				ID: id,
			}
		}

		record := HistoryQueryResult{
			TxId:   response.TxId,
			Record: &asset,
		}
		records = append(records, record)
	}

	return records, nil
}

func main() {
	proTransferSmartContract := new(ProductTransferSmartContract)

	cc, err := contractapi.NewChaincode(proTransferSmartContract)

	if err != nil {
		panic(err.Error())
	}

	if err := cc.Start(); err != nil {
		panic(err.Error())
	}
}
