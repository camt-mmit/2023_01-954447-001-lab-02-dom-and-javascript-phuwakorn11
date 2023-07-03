function createElement() {
  const tmpInput = document.querySelector("template.app-tmp-input");
  const container = tmpInput.content.cloneNode(true).firstElementChild;

  const inputElement = [
    ...document.querySelectorAll("input[type='number'].app-cmp-input"),
  ];

  container.querySelector(".app-cmp-input-no").textContent = `${
    inputElement.length + 1
  }`;

  container
    .querySelector("input[type='number'].app-cmp-input")
    .addEventListener("change", () => {
      const result = [
        ...document.querySelectorAll("input[type='number'].app-cmp-input"),
      ].reduce((carry, elem) => carry + elem.valueAsNumber, 0);

      document.querySelector(
        "output.app-cmp-result"
      ).value = `${result.toLocaleString()}`;
    });

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
