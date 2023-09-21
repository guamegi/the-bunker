export default class SkillBars {
  constructor(obj) {
    this.category = obj.category;
    this.name = obj.name;
    this.percentage = obj.percentage;
    this.color = obj.color;
  }

  createEl(idx, all) {
    const el = `
        <div>
          ${
            idx === 0
              ? `<div class='font-semibold'>${this.category}</div>`
              : this.category !== all[idx - 1].category
              ? `<div class='pt-10 font-semibold'>${this.category}</div>`
              : ""
          }
          <div class="my-1.5 w-full bg-gray-100 rounded-full">
            <div class="bg-${
              this.color
            }-600 text-sm font-medium text-white text-center p-1.5 leading-none rounded-full" style="width: ${
      this.percentage
    }%"> ${this.name}</div>
          </div>
        </div>
    `;
    document.querySelector("#skills").insertAdjacentHTML("beforeend", el);
  }
}
