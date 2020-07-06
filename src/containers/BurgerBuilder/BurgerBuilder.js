import React, { Component} from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/BuildControls/OrderSummary/OrderSummary';
import orderSummary from '../../components/Burger/BuildControls/OrderSummary/OrderSummary';

const INGREDIENTPRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.2,
    bacon: .7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients).map(ingKey => {
            return ingredients[ingKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0});
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTPRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTPRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    render () {
        const disabledButton = {
            ...this.state.ingredients
        };
        for (let key in disabledButton){
            disabledButton[key] = disabledButton[key] <= 0
        }

        return (
            <div>
                <Modal>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler} disabled={disabledButton} price={this.state.totalPrice} purchasable={this.state.purchasable}/>
            </div>
        );
    }
}

export default BurgerBuilder;