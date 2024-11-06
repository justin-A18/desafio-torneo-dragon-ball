export class CalculatorADapter{

  static isPowerOfTwo(n: number): boolean { 
    // return Math.log2(n) % 1 === 0; // solución alternativa
    return (n & (n - 1)) === 0;
  }

  static shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }
}