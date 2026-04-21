export function createAstronaut(frameClass = "frame") {
  return `
    <div class="${frameClass}">
      <div class="upper-body">
        <div class="head">
          <div class="face-shield"></div>
        </div>
        <div class="ear left"></div>
        <div class="ear right"></div>
      </div>
      <div class="lower-body">
        <div class="sleeve"></div>
        <div class="suit"></div>
        <div class="arm left">
          <div class="hand left"></div>
        </div>
        <div class="arm right">
          <div class="hand right"></div>
        </div>
        <div class="leg left">
          <div class="foot left"></div>
        </div>
        <div class="leg right">
          <div class="foot right"></div>
        </div>
      </div>
    </div>
  `;
}
