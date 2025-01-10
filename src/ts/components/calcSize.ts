// CalcSize.ts
export default class CalcSize {
  vpw: number;
  vph: number;
  pcdw: number;
  breakPoint: number;
  spdw: number;

  constructor() {
    this.updateAll();
    window.addEventListener('resize', () => this.updateAll());
  }

  updateAll() {
    this.updateDimensions();

    this.pcdw = this.getCSSValueAsNumber('--pcdw');
    this.spdw = this.getCSSValueAsNumber('--spdw');
    this.breakPoint = this.getCSSValueAsNumber('--bp');

    // console.log('CalcSize updated:', {
    //   vpw: this.vpw,
    //   vph: this.vph,
    //   pcdw: this.pcdw,
    //   spdw: this.spdw,
    //   breakPoint: this.breakPoint,
    // });
  }

  getCSSValueAsNumber(property: string): number {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(property)
      .trim();

    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      console.warn(`CSS変数 ${property} が設定されていないか無効です。`);
      return 0; // または適切なデフォルト値を設定
    }
    return parsedValue;
  }

  updateDimensions() {
    const elm = document.documentElement;
    const rect = elm.getBoundingClientRect();
    this.vpw = rect.width;
    this.vph = rect.height;
  }

  responsive(pcNum: number, spNum: number): number {
    return window.innerWidth > this.breakPoint
      ? this.pc(pcNum)
      : this.sp(spNum);
  }

  pc(num: number): number {
    return Math.min((this.vpw * num) / this.pcdw, num);
  }

  vwpc(num: number): number {
    return (this.vpw * num) / this.pcdw;
  }

  sp(num: number): number {
    return (this.vpw * num) / this.spdw;
  }
}
