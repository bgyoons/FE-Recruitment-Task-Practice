class DarkModeToggle {
  isDarkMode = null;

  constructor({ $target }) {
    const $darkModeSection = document.createElement("section");
    const $darkModeToggle = document.createElement("input");

    this.$darkModeSection = $darkModeSection;
    this.$darkModeToggle = $darkModeToggle;
    this.$darkModeToggle.type = 'checkbox';

    $darkModeSection.className = "DarkModeSection";
    $darkModeToggle.className = "DarkModeToggle";

    $darkModeSection.appendChild($darkModeToggle);
    $target.appendChild($darkModeSection);

    $darkModeToggle.addEventListener("change", e => {
      this.setColorMode(e.target.checked);
    });

    this.initColorMode();
  }

  initColorMode() {
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.$darkModeToggle.checked = this.isDarkMode;
    this.setColorMode(this.isDarkMode)
  }

  setColorMode(isDarkMode) {
    document.documentElement.setAttribute('color-mode', isDarkMode ? 'dark' : 'light');
  }
}
