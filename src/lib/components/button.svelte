<script>
  export let bg = "#FFF"
</script>

<button class="button drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]" style={`--bg: ${bg};`}>
  <span class="convex">
    <span></span>
  </span>
  <p class="buttonContent">
    <slot />
  </p>
</button>

<style>
.button {
  line-height: 0px;
  position: relative;
  font-weight: 800;
  z-index: 3;
  width: fit-content;
  }
.buttonContent {
  position: relative;
  z-index: 5;
  
}
.button .convex::before, .button .convex span {
  content: '';
  z-index: 1;
  border-radius: 50%/3px;
  background: var(--bg);
  bottom: -2px;
  top: -2px;
  left: 0;
  width: 100%;
  position: absolute;
}
.button .convex::after {
  content: '';
  z-index: 2;
  border-radius: 3px/50%;
  background: var(--bg);
  left: -3px;
  right: -3px;
  top: 0;
  height: 100%;
  position: absolute;
}

</style>