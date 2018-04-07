class ForeignCurrencyAccount extends Account {
    Constructor(customerId, accountId, balance, currency){
        this.super(customerId, accountId, balance);
        this.currency = currency;
    }
}