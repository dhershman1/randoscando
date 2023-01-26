declare let random: random.Static

declare namespace random {
  interface AleaSeed {
    next(): number,
    c: number,
    s0: number,
    s1: number,
    s2: number
  }

  type Seed = AleaSeed | string | number;
  type ValueSeedPair = [any, Seed]
  type GeneratorPair = [RandomGenerator, Seed]
  type GeneratorPairList = [RandomGenerator[], Seed]
  type Weight = [any, number]

  interface RandomGenerator {
    value: any,
    step: (seed: AleaSeed) => [RandomGenerator, Seed]
  }

  interface Static {
    /**
     * Creates an initial seed using the alea algorithm
     */
    initialSeed(seed: string | number): AleaSeed

    /**
     * Manually step through a random generator function
     */
    step(fnGen: RandomGenerator, seed: Seed): ValueSeedPair
    step(fnGen: RandomGenerator): (seed: Seed) => ValueSeedPair

    /**
     * Take multiple generators and map them down into a single map generator
     */
    map(list: RandomGenerator[]): GeneratorPairList

    /**
     * Creates a generator for a random int
     */
    int(min: number, max: number): GeneratorPair
    int(min: number): (max: number) => GeneratorPair

    /**
     * Creates a generator for a random float
     */
    float(min: number, max: number): GeneratorPair
    float(min: number): (max: number) => GeneratorPair

    /**
     * Takes a list of weighted values and picks a value from it
     */
    weighted(list: Weight[]): GeneratorPair

    /**
     * Creates a generator function for a list of values and gives them all equal weight
     */
    uniform<T = any>(list: T[]): GeneratorPair

    /**
     * Creates a Generator for a random letter between A-Z
     */
    letter(def?: string): GeneratorPair

    /**
     * Creates a generator for a random pair of results from other generators
     */
    pair(genOne: RandomGenerator, genTwo: RandomGenerator): GeneratorPair
    pair(genOne: RandomGenerator): (genTwo: RandomGenerator) => GeneratorPair

    /**
     * Creates a generator the will create a list of random values to the length specified using the generator provided
     */
    list(len: number, gen: RandomGenerator): GeneratorPair
    list(len: number): (gen: RandomGenerator) => GeneratorPair
  }
}
