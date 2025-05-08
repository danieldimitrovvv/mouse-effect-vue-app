export class StyleUtil {
  static calculateOpacityStep(count: number, opacityStep: number) {
    if (count * opacityStep > 1) {
      return 1 / count;
    }

    return opacityStep;
  }
}
