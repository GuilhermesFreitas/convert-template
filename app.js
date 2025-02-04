const USD = 5.75;
const EUR = 5.99;
const GBP = 7.21;
const JPY = 0.03744;
const KRW = 0.003973;

const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

amount.addEventListener("input", () => {
  // Garante que o valor será um número sem caracteres não numéricos
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

// Captando o evento de submit (enviar) do formulário.
form.onsubmit = (event) => {
  event.preventDefault();

  const amountValue = parseFloat(amount.value);  // Garantir que o valor seja numérico

  // Verificando se o valor digitado é um número válido
  if (isNaN(amountValue) || amountValue <= 0) {
    alert("Por favor, insira um valor válido para conversão.");
    return;
  }

  switch(currency.value) {
    case "USD":
      convertCurrency(amountValue, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amountValue, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amountValue, GBP, "£");
      break;
    case "JPY":
      convertCurrency(amountValue, JPY, "¥");
      break;
    case "KRW":
      convertCurrency(amountValue, KRW, "₩");
      break;
    default:
      alert("Selecione uma moeda válida.");
  }
}

// Função de conversão da moeda.
function convertCurrency(amount, price, symbol) {
  try {
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

    // Calculando o valor total
    let total = amount * price;
    result.textContent = `${formatCurrencyBRL(total)} Reais`;

    footer.classList.add("show-result");
  } catch (error) {
    console.log(error);
    footer.classList.remove("show-result");
    alert("Não foi possível converter.");
  }
}

// Função para formatar o valor como moeda brasileira (BRL)
function formatCurrencyBRL(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
