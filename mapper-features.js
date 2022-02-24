const yesNo = {'Don\'t care': null, Yes: true, No: false};


const MapperFeatures = [
    {
        name: 'PRG Data Size',
        description: `The amount of program data available to the game. 
                    This dictates how big of a game you can create - all of your maps, data, logic, and more needs to fit into this space.`,
        type: 'dropdown',
        options: {'Don\'t care': null,'16kb': 1, '32kb': 2, '64kb': 4, '128kb': 8, '256kb': 16, '512kb': 32, '1mb+': 64},
        field: 'maxPrg',
        comparison: 'max'
    }, {
        name: 'CHR Data Size (8kb)',
        description: `The amount of graphics memory the game has access to. Each 8kb can be broken into 2 4kb banks, often used for foreground and background graphics. 
                        Note that not all mappers allow separating them this way, so you may have to swap them together!`,
        type: 'dropdown',
        options: {'Don\'t care': null, '8kb': 1, '16kb': 2, '32kb': 4, '64kb': 8, '128kb': 16, '256kb': 32, '512kb+': 64},
        field: 'maxChr',
        comparison: 'max'
    }, {
        name: 'CHR Ram Support',
        description: `Supports using ram for chr data instead of hardcoded data. This data must be stored in prg then loaded manually.`,
        type: 'radio',
        options: yesNo,
        field: 'chrRam',
        comparison: 'exact'
    }, {
        name: 'Ad-hoc mirroring switching',
        description: `Mappers that allow you to switch between horizontal and vertical mirroring for the nametable, rather than it being hardcoded on the cartridge`,
        type: 'radio',
        options: yesNo,
        field: 'adhocMirror',
        comparison: 'exact'
    }, {
        name: 'IRQ Support',
        description: 'Supports interrupts for unique features, such as a scanline counter in mmc3.',
        type: 'radio',
        options: yesNo,
        field: 'irqSupport',
        comparison: 'exact',

    }, {
        name: '4-Screen Mirroring',
        description: 'Allows using 4-screen mirroring with extra ram soldered onto the board',
        type: 'radio',
        options: yesNo,
        field: '4screenMirror',
        comparison: 'exact',
    }, {
        name: '1-Screen Mirroring',
        description: 'Allows mirroring a nametable onto itself, so the second nametable is not shown without deliberately changing it.',
        type: 'radio',
        options: yesNo,
        field: '1screenMirror',
        comparison: 'exact',
    },{
        name: 'PRG Ram',
        description: `Mappers with this feature allow you to use extra ram on the cartridge to store data. This can also be battery-backed, allowing for save data that persists when the console is turned off. 
                      Useful for complex games that have a lot of logic built in, and longer games needing save data.`,
        type: 'radio',
        options: {'Don\'t care': null, 'None': 0, '8kb': 1, '16kb+ (bankswitched)': 4},
        field: 'prgRam',
        comparison: 'max'
    }, {
        name: 'CHR Window Size',
        description: 'Allows switching the window for chr data at a more fine-grained size than the default.',
        type: 'dropdown',
        options: {'Don\'t care': null, '8k or less (2 pattern tables)': 8, '4k or less (1 pattern table)': 4, '2k or less (1/2 pattern table)': 2, '1k or less (1/4 pattern table)': 1},
        field: 'minChrWindow',
        comparison: 'min',

    }, {
        name: 'PRG Window Size',
        description: 'Allows switching the window for chr data at a more fine-grained size than the default.',
        type: 'dropdown',
        options: {'Don\'t care': null, '32k or less (1 big bank)': 16, '16k or less (2 banks)': 8, '8k or less (4 banks)': 4},
        field: 'minPrgWindow',
        comparison: 'min',
    }, {
        name: 'Expansion Audio',
        description: 'Allows using additional audio channels, not normally available on NES hardware.',
        type: 'radio',
        options: yesNo,
        field: 'expansionAudio',
        comparison: 'exact',
    }, {
        name: 'Modern Cartridges Available',
        description: `Some NES cartridges have been recreated with modern components, allowing publishing your games on a real cartridge. Some of the rarer and more obscure mappers have not
                      gotten this treatment. We exclude those by default, since most people using this tool will want a cartridge at some point.`,
        type: 'radio',
        options: yesNo,
        defaultOption: true,
        field: 'cartAvailable',
        comparison: 'exact'
    }, {
        name: 'Expanded CHR Tiles',
        description: 'Allows using more than the standard number of chr tiles on one screen using mapper trickery. Be ware this is very rare in current available cartridges!',
        type: 'radio',
        options: yesNo,
        field: 'expandedTiles',
        comparison: 'exact',
    }, {
        name: 'Self-flashable',
        description: 'Allows the cartridge to rewrite parts of its flash storage on its own, allowing for storing large amounts of user data.',
        type: 'radio',
        options: yesNo,
        field: 'selfFlashable',
        comparison: 'exact',
    }
];