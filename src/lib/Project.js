export default class Project {
  constructor(obj) {
    this.name = obj.name;
    this.period = obj.period;
    this.images = obj.images;
    this.desc = obj.desc;
    this.func = obj.func;
    this.github = obj.github;
    this.url = obj.url;
    this.stack = obj.stack;
  }

  createEl() {
    const el = `
          <div
            class="rounded overflow-hidden shadow-[0px_8px_16px_gray] py-20 mb-28"
            key=""
          >
            <div class="mb-4">
              <h3 class="text-2xl py-4 font-medium text-center">${
                this.name
              }</h3>
              <div class="text-sm py-2 font-medium text-gray-400 text-center">
              ${this.period}
              </div>
            </div>
            <div class="flex flex-col md:flex-row justify-evenly px-4">
              <!-- <div class="wow fadeIn"> -->
              <div class="w-full md:w-1/2 p-4">
                <div
                  class="border h-80 md:h-full bg-[url(${
                    this.images[0]
                  })] bg-contain bg-center bg-no-repeat"
                ></div>
              </div>
              <!-- 설명, 스택 -->
              <div class="w-full md:w-1/2 p-4">
                <p>
                ${this.desc}
                </p>
                <div class="flex justify-end">
                  <button
                    class="px-8 py-3 my-5 bg-gray-800 text-white text-sm font-normal grid content-center"
                    onClick=""
                  >
                    상세 보기
                  </button>
                </div>

                <hr />
                <div class="flex flex-col p-5 text-sm">
                  <div class="flex py-2">
                    <div class="w-1/3 md:w-1/3 font-normal pl-2">
                      주요 기능
                    </div>
                    <div class="w-2/3 md:w-2/3">
                    ${this.func}
                    </div>
                  </div>
                  ${
                    this.github
                      ? `<div class="flex py-2">
                        <div class="w-1/3 md:w-1/3 font-normal pl-2">
                          GitHub
                        </div>
                        <div class="w-2/3 md:w-2/3">
                          <a
                            href="${this.github}"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            ${this.github}
                          </a>
                        </div>
                      </div>`
                      : ""
                  }
                  ${
                    this.url
                      ? `<div class="flex py-2">
                    <div class="w-1/3 md:w-1/3 font-normal pl-2">
                      URL
                    </div>
                    <div class="w-2/3 md:w-2/3">
                      <a
                        href="${this.url}"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                      ${this.url}
                      </a>
                    </div>
                  </div>`
                      : ""
                  }
                 
                  <div class="flex py-2">
                    <div class="w-1/3 md:w-1/3 font-normal pl-2">
                      기술 스택
                    </div>
                    <div class="w-2/3 md:w-2/3">
                    ${this.stack}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;

    document.querySelector("#projects").insertAdjacentHTML("beforeend", el);
  }
}
