document.addEventListener('DOMContentLoaded', () => {
    const wrap = document.querySelector('.form-wrap');
    const form = document.querySelector('.form-inner');
    const themeInput = document.querySelector('.form-row-inner__theme');
    const restButtonTheme = document.querySelector('.form-row-inner__button');
    const classInput = document.querySelector('.form-row-inner__class');
    const varinatItems = document.querySelectorAll('.variant-list-item');
    const variantButtonMore = document.querySelector('.variant-button');
    const textarea = document.querySelector('.form-row-inner__text');
    const targetTextArea = document.querySelector('.form-row-numbers__number');
    const nextButton = document.querySelector('.form-inner-buttons__next');

    const activeElTheme = (input, btn) => {
        const parentInput = input.parentElement;

        input.addEventListener('input', () => {
            if (input.value.length != 0) {
                if (!parentInput.classList.contains('field-active')) {
                    parentInput.classList.add('field-active');
                }

                btn.classList.add('btn-active');
            } else {
                parentInput.classList.remove('field-active');

                btn.classList.remove('btn-active');
            }
        });
        input.addEventListener('blur', () => {
            parentInput.classList.remove('field-active');
        });
    };

    const removeInputValueTheme = (input, btn) => {
        btn.addEventListener('click', () => {
            input.value = '';
            btn.classList.remove('btn-active');
        });
    };

    const activeElClass = (input) => {
        const body = document.querySelector('body');
        const classParent = input.parentElement;
        const classListEl = classParent.querySelector('.class-list');
        const classListElements =
            classListEl.querySelectorAll('.class-list-item');

        input.addEventListener('click', (e) => {
            e._stop = true;

            classParent.classList.toggle('field-active');
            classListEl.classList.toggle('class-list-active');
        });

        classListElements.forEach((el) => {
            el.addEventListener('click', () => {
                classListElements.forEach((el) =>
                    el.classList.remove('class-item-selected')
                );
                el.classList.add('class-item-selected');
                input.value = el.textContent;
            });
        });

        body.addEventListener('click', (e) => {
            if (e._stop) return;

            if (classListEl.classList.contains('class-list-active')) {
                classListEl.classList.remove('class-list-active');
                classParent.classList.remove('field-active');
            }
        });
    };

    const addVariantEl = (variants, button) => {
        const count = 3;

        const countEnabledVariants = () => {
            return Array.from(variants).filter(
                (el) => !el.classList.contains('disabled')
            ).length;
        };

        let noDisabled = countEnabledVariants();

        button.addEventListener('click', () => {
            for (let i = noDisabled; i < noDisabled + count; i++) {
                if (i < variants.length) {
                    if (variants[i].classList.contains('disabled')) {
                        variants[i].classList.remove('disabled');
                    }
                } else {
                    button.style.display = 'none';
                }
            }

            if (noDisabled <= variants.length) {
                noDisabled += count;
            }
        });
    };

    const overflowTextarea = (area, element) => {
        const maxLength = 200;
        const parentArea = area.parentElement.parentElement;

        area.addEventListener('input', () => {
            let length = area.value.length;
            element.textContent = length;

            if (length > maxLength) {
                if (!parentArea.classList.contains('max-length')) {
                    parentArea.classList.add('max-length');
                }
            } else {
                parentArea.classList.remove('max-length');
            }
        });
    };

    const eventButton = (wrapper, theme, text, button) => {
        const parentArea = text.parentElement.parentElement;
        wrapper.addEventListener('mousemove', () => {
            if (
                theme.value != '' &&
                text.value != '' &&
                !parentArea.classList.contains('max-length')
            ) {
                button.classList.remove('disabled-btn');
                button.classList.add('active-btn');
                button.removeAttribute('disabled');
            } else {
                button.classList.remove('active-btn');
                button.classList.add('disabled-btn');
                button.setAttribute('disabled', '');
            }
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    activeElTheme(themeInput, restButtonTheme);
    removeInputValueTheme(themeInput, restButtonTheme);
    activeElClass(classInput);
    addVariantEl(varinatItems, variantButtonMore);
    overflowTextarea(textarea, targetTextArea);
    eventButton(wrap, themeInput, textarea, nextButton);
});
