const amount = document.querySelector("#amount");
const from = document.querySelector("#from");
const to = document.querySelector("#to");
const btn = document.querySelector("#btn");
const result = document.querySelector("#result");

const url = "https://api.exchangerate-api.com/v4/latest/USD";

async function loadCurrencies() {
  let res = await fetch(url);
  let data = await res.json();
  let currencies = Object.keys(data.rates);

  currencies.forEach(code => {
    let opt1 = document.createElement("option");
    let opt2 = document.createElement("option");
    opt1.value = opt2.value = code;
    opt1.text = opt2.text = code;
    from.appendChild(opt1);
    to.appendChild(opt2);
  });

  from.value = "USD";
  to.value = "PKR";
}

btn.addEventListener("click", async () => {
  let amt = amount.value;
  if (amt === "" || amt <= 0) {
    result.innerText = "Enter valid amount";
    return;
  }

  let res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from.value}`);
  let data = await res.json();
  let rate = data.rates[to.value];
  let converted = (amt * rate).toFixed(2);

  result.innerText = `${amt} ${from.value} = ${converted} ${to.value}`;
});

loadCurrencies();
