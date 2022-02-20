const MapperList = [{
    id: 0,
    name: 'nrom',
    maxPrg: 2,
    maxChr: 1,
    chrRam: false,
    prgRam: 0,
    adhocMirror: false,
    irqSupport: false,
    '4screenMirror': false,
    '1screenMirror': false,
    minChrWindow: 8,
    minPrgWindow: 16,
    expansionAudio: false, 
    cartAvailable: true,
    expandedTiles: false,
    selfFlashable: false,
    
    notes: `This is basically not using a mapper. It is the basic set of features the NES supported, without any creative use of the system. Many early games used this mapper.`
}, {
    id: 1,
    name: 'mmc1',
    maxPrg: 32,
    maxChr: 16,
    chrRam: true,
    prgRam: 4,
    adhocMirror: true,
    irqSupport: false,
    '4screenMirror': false,
    '1screenMirror': true,
    minChrWindow: 4,
    minPrgWindow: 8,
    expansionAudio: false,
    cartAvailable: true,
    expandedTiles: false,
    selfFlashable: false,

    notes: `This is one of the first discrete mappers made available. Be aware that the methods required to communicate with the mapper are a bit hairy, and involve splitting
            byte data down to individual bits to be sent over serially. This introduces possibilities for weird timing bugs with nmi, if not timed carefully.`
}, {
    id: 2,
    name: 'uxrom',
    maxPrg: 16,
    maxChr: 1,
    chrRam: true,
    prgRam: 0,
    adhocMirror: false,
    irqSupport: false,
    '4screenMirror': false,
    '1screenMirror': false,
    minChrWindow: 8,
    minPrgWindow: 8,
    expansionAudio: false,
    cartAvailable: true,
    expandedTiles: false,
    selfFlashable: false,

    notes: `This is a common mapper, both in original NES development and homebrew. It is fairly simple, but allows for greatly expanded PRG (program) storage. It is otherwise
            fairly simple to interface with, and a good pick for newvcomers. One challenge is that it requires chr ram, which has a learning curve to start using.`
}, {
    id: 30,
    name: 'unrom 512 / NESMaker',
    maxPrg: 32,
    maxChr: 4,
    chrRam: true,
    prgRam: 0,
    adhocMirror: true,
    irqSupport: false,
    '4screenMirror': true,
    '1screenMirror': true,
    minChrWindow: 8,
    minPrgWindow: 8,
    expansionAudio: false,
    cartAvailable: true,
    expandedTiles: false,
    selfFlashable: true,

    notes: `This is basically uxrom with super powers. This was created by RetroUSB for homebrew games, and adds a few features to uxrom boards. Namely, it supports larger prg data
            bankswitched chr ram, self-flashing, and 4 screen mirroring.`
}, {
    id: 3,
    name: 'cnrom',
    maxPrg: 2,
    maxChr: 64,
    chrRam: false,
    prgRam: 0,
    adhocMirror: false,
    irqSupport: false,
    '4screenMirror': false,
    '1screenMirror': false,
    minChrWindow: 8,
    minPrgWindow: 16,
    expansionAudio: false,
    cartAvailable: true,
    expandedTiles: false,
    selfFlashable: false,

    notes: `This is a common mapper, allowing for  lot of chr data, and an otherwise limited amount of prg. This can be used for graphically complex games.`

}, {
    id: 7,
    name: 'axrom',
    maxPrg: 16,
    maxChr: 1,
    chrRam: true,
    prgRam: 0,
    adhocMirror: false,
    irqSupport: false,
    '4screenMirror': false,
    '1screenMirror': true,
    minChrWindow: 8,
    minPrgWindow: 16,
    expansionAudio: false,
    cartAvailable: true,
    expandedTiles: false,
    selfFlashable: false,

    notes: `This mapper is interesting in its support for 1-screen mirroring, opting for that over more common horizontal/vertical mirroring.`

}, {
    id: 9,
    name: 'mmc2 (punchout)',
    maxPrg: 16,
    maxChr: 32,
    chrRam: false,
    prgRam: 0,
    adhocMirror: true,
    irqSupport: false,
    '4screenMirror': false,
    '1screenMirror': false,
    minChrWindow: 4,
    minPrgWindow: 4,
    expansionAudio: false,
    cartAvailable: false,
    expandedTiles: false,
    selfFlashable: false,

    notes: `This is a somewhat obscure mapper that was used for the game Punchout. It has a few oddities about it: first is thaat it allows switching wto pairs of 4kb chr rom banks at the same time, automatically
            alternating between them during rendering. This allows the tile limit to increase to 512 from 256. It also has 4 prg banks, but interestingly only the first one is bank switchable - the other 3 are fixed.`

}, {
    id: 4,
    name: 'mmc3',
    maxPrg: 32,
    maxChr: 32,
    chrRam: true,
    prgRam: 1,
    adhocMirror: true,
    irqSupport: true,
    '4screenMirror': true,
    '1screenMirror': false,
    minChrWindow: 2,
    minPrgWindow: 4,
    expansionAudio: false,
    cartAvailable: true,
    expandedTiles: false,
    selfFlashable: false,


    notes: `This is a very popular homebrew mapper, allowing for a good amount of complexity while still being simple enough to have readily available NES cartridges out there. It allows switching between a larger
            number of small prg banks than others. (2 8k switchable banks, and a 16kb fixed bank) It also supports having much smaller chr windows, so you can swap out part of your sprite list without swapping everything.
            (2 2k banks, and 1 4k bank). It also has a scanline counter on IRQ, allowing for many interesting effects not available with other mappers.`

}, {
    id: 5,
    name: 'mmc5',
    maxPrg: 64,
    maxChr: 64,
    chrRam: false,
    prgRam: 4,
    adhocMirror: true,
    irqSupport: true,
    '4screenMirror': true,
    '1screenMirror': true,
    minChrWindow: 1,
    minPrgWindow: 4,
    expansionAudio: true,
    cartAvailable: false,
    expandedTiles: true,
    selfFlashable: false,

    notes: `This is a very complex and powerful mapper, that was mostly used during the end of the NES's commercial lifetime. Be aware that mmc5 cartridges are not yet being produced by homebrewers, so the features here are largely
            not going to be accessible to you.`


}, {
    id: 111,
    name: 'gtrom (cheapocabra)',
    maxPrg: 32,
    maxChr: 2,
    chrRam: true,
    prgRam: 0,
    adhocMirror: false,
    irqSupport: false,
    '4screenMirror': true,
    '1screenMirror': false,
    minChrWindow: 8,
    minPrgWindow: 16,
    expansionAudio: false,
    cartAvailable: true,
    expandedTiles: false,
    selfFlashable: true,

    notes: `This is an early homebrew mapper, designed by Membler Industries. It is meant to be a cheap board that allows bankswitching and a few other cheap but powerful features.
            Of note, it always uses 4-screen mirroring, and bankswitched chr ram.`

}, {
    id: 69,
    name: 'fme-7 (Sunsoft 5a/b)',
    maxPrg: 16,
    maxChr: 32,
    chrRam: false,
    prgRam: 4,
    adhocMirror: true,
    irqSupport: true,
    '4screenMirror': false,
    '1screenMirror': true,
    minChrWindow: 8,
    minPrgWindow: 4,
    expansionAudio: true,
    cartAvailable: true,
    expandedTiles: false,
    selfFlashable: false,

    notes: `This is a powerful mapper, similar to mmc3, but with the addition of expansion audio. This was used in sunsoft games back in the day. InfiniteNESLives has a modern verison of this board
            that has been up for sale in the past. Note that it has a cpu cycle counter, but no scanline counter. Note that FME-7 supports 512k prg, however 5B only supports 256k prg.`
}];
