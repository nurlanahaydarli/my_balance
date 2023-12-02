let cash_in_btn = document.getElementById("cash_in")
let withdraw_btn = document.getElementById("withdraw")
let show_balance_btn = document.getElementById("show_balance")
let amount = document.getElementById("amount")
let balance = document.getElementById("balance")
let tbody = document.getElementById('tbody')
let alert_html = document.getElementById('alert')
const myBalance = {
    name: 'Nurlana',
    balance: 0,
    date: new Date,
    report: [],
    limit: 10000,
    cash_in: function (amount) {
        if (amount >= this.limit || amount <= 0 || !amount) {
            return  alert_fn()
        }
        this.balance += amount
        const cash_in_history = {
            id: `CS${parseInt(Math.random() * 100000)}`,
            type: "Cash",
            amount: amount,
            created: this.date,
            balance: this.balance
        }

        this.report.push(cash_in_history)
        alert_success()
        return this.balance;
    },
    withdraw: function (amount) {
        const checkValid = () => {
            if (this.balance < 0 || this.balance < amount) {
                return alert_fn()
            }
            this.balance = parseFloat(this.balance - amount,2)
            const withdraw_history = {
                id: `WD${parseInt(Math.random() * 100000)}`,
                type: "Withdraw",
                amount: amount,
                created: this.date,
                balance: this.balance
            }
            alert_success()
            this.report.push(withdraw_history)
        }
        checkValid()

        return this.balance

    },
    show: function () {
        return this.balance
    }

}

cash_in_btn.addEventListener("click", function () {
    let money = amount.value;
    myBalance.cash_in(+money)
    amount.value = ""
    balance.innerHTML = myBalance.balance
})
withdraw_btn.addEventListener("click", function () {
    let money = amount.value;
    myBalance.withdraw(+money)
    amount.value = ""
    balance.innerHTML = myBalance.balance
})
show_balance_btn.addEventListener("click", function () {
    let result = myBalance.show()
    let content = myBalance.report.map((element, index) => {
        return `
        <tr>
            <td>${index + 1}</td>
            <td>${element.id}</td>
            <td class="text-${element.type === "Cash" ? "success" : "danger"}">${element.type}</td>
            <td class="text-${element.type === "Cash" ? "success" : "danger"}"> ${element.type === 'Cash' ? "+" + element.amount : "-" + element.amount}</td>
            <td>${element.balance}</td>
            <td>${element.created.getDate()}.${element.created.getMonth()}.${element.created.getFullYear()}/(${element.created.getHours()}:${element.created.getMinutes()})</td>
        </tr>
        `
    }).join('')
    tbody.innerHTML = content
})

function alert_fn() {
   let result =  alert_html.innerHTML = `
    <div class="alert alert-danger" role="alert">Invalid action!!!</div>
    `
    return result
}
function alert_success() {
   let result =  alert_html.innerHTML = `
    <div class="alert alert-success" role="alert">Action completely successful!!!</div>
    `
    return result
}