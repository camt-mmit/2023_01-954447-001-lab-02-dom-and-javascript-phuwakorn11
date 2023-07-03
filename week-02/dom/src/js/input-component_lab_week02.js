export function createComponent(componentElement) {
  const tmpInput = componentElement.querySelector("template.app-tmp-input");
  const inputsList = tmpInput.parentElement;

  const updateResult = () => {
    const children = [...inputsList.children].filter(
      (elem) => elem !== tmpInput
    );

    const result = children.reduce(
      (carry, element) =>
        carry +
        element.querySelector('input[type="number"].app-cmp-input')
          .valueAsNumber,
      0
    );

    [...componentElement.querySelectorAll("output.app-cmp-result")].forEach(
      (elem) => (elem.value = `${result.toLocaleString()}`)
    );
  };

  const updateList = () => {
    updateResult();

    const children = [...inputsList.children].filter(
      (elem) => elem !== tmpInput
    );

    children.forEach((element, i) => {
      [...element.querySelectorAll(".app-cmp-input-no")].forEach(
        (elem) => (elem.textContent = `${i + 1}`)
      );
    });

    [...inputsList.querySelectorAll(".app-cmd-remove-input")].forEach(
      (elem) => (elem.disabled = children.length === 1)
    );
  };

  const createElement = () => {
    const container = tmpInput.content.cloneNode(true).firstElementChild;

    container.addEventListener("click", (e) => {
      if (e.target.matches(".app-cmd-remove-input")) {
        container.remove();

        updateList();
      }
    });

    inputsList.append(container);
    updateList();
  };

  componentElement.addEventListener("click", (e) => {
    if (e.target.matches(".app-cmd-add-input")) {
      createElement();
    }
  });

  inputsList.addEventListener("change", (e) => {
    if (e.target.matches('input[type="number"].app-cmp-input')) {
      updateResult();
    }
  });

  createElement();
}

export function createSection(sectionElement) {
  const tmpSection = sectionElement.querySelector("template.app-tmp-section");
  const sectionsList = tmpSection.parentElement;

  const updateList = () => {
    const children = [...sectionsList.children].filter(
      (elem) => elem != tmpSection
    );

    children.forEach((element, i) => {
      [...element.querySelectorAll(".app-cmp-section-no")].forEach(
        (elem) => (elem.textContent = `${i + 1}`)
      );
    });

    [...sectionsList.querySelectorAll(".app-cmd-remove-section")].forEach(
      (elem) => (elem.disabled = children.length === 1)
    );
  };

  const createSection = () => {
    const container = tmpSection.content.cloneNode(true).firstElementChild;

    container.addEventListener("click", (e) => {
      if (e.target.matches(".app-cmd-remove-section")) {
        container.remove();

        updateList();
      }
    });

    sectionsList.append(container);
    createComponent(container);
    updateList();
  };

  sectionElement.addEventListener("click", (e) => {
    if (e.target.matches(".app-cmd-add-section")) {
      createSection();
    }
  });

  createSection();
}
