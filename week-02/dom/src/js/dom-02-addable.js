function createElement() {
  //Create Elements
  const container = document.createElement("div");
  const label = document.createElement("label");
  const title = document.createElement("b");
  const input = document.createElement("input");

  const inputElements = [
    ...document.querySelectorAll('input[type="number"].app-cmp-input'),
  ];

  title.textContent = `Number ${inputElements.length + 1}: `;

  input.type = "number";
  input.setAttribute("value", "0"); // input.defaultValue = '0';
  input.classList.add("app-cmp-input");

  input.addEventListener("change", () => {
    const result = [
      ...document.querySelectorAll('input[type="number"].app-cmp-input'),
    ].reduce((carry, elem) => carry + elem.valueAsNumber, 0);

    document.querySelector(
      "output.app-cmp-result"
    ).value = `${result.toLocaleString()}`;
  });

  label.append(title);
  label.append(input);
  container.append(label);

  return container;
}

document.addEventListener("DOMContentLoaded", () => {
  const inputsList = document.querySelector(".app-cmp-inputs-list");
  const addCommand = document.querySelector(".app-cmd-add-input");

  addCommand.addEventListener("click", () =>
    inputsList.append(createElement())
  );

  inputsList.append(createElement());
});
