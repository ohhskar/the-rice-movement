import { gsap } from 'gsap';

class BankToggler {
  constructor(element) {
    this.parent = element;
    this.toggler = element.querySelector('.bank__view');
    this.body = element.querySelector('.bank__body');
    this.defaultDuration = 0.25;
    this.defaultEase = 'power1.out';
  }

  toggle() {
    if (this.toggler.classList.contains('bank__view--hide')) {
      gsap.timeline().to(this.body, {
        duration: this.defaultDuration,
        ease: this.defaultEase,
        marginTop: 0,
        height: 0,
        onComplete: () => {
          this.toggler.textContent = '+ View Details';
        },
      });
    } else {
      gsap.timeline().to(this.body, {
        duration: this.defaultDuration,
        ease: this.defaultEase,
        marginTop: this.vhToPx(3.125),
        height: this.body.scrollHeight,
        onComplete: () => {
          this.toggler.textContent = '- Hide Details';
        },
      });
    }

    this.toggler.classList.toggle('bank__view--hide');
  }

  // eslint-disable-next-line class-methods-use-this
  vhToPx(value) {
    return (value / 100) * window.innerHeight;
  }

  load() {
    this.toggler.addEventListener('click', () => this.toggle());
  }
}

const initializeAnimation = () => {
  const bankNodes = document.querySelectorAll('.bank');
  const bankObjects = [...bankNodes].map((element) => new BankToggler(element));
  bankObjects.forEach((bank) => bank.load());
};
document.addEventListener('DOMContentLoaded', initializeAnimation);
