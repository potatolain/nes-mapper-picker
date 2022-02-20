const MapperOptions = [
    {
        name: 'PRG Data Size',
        description: `The amount of program data available to the game. 
                    This dictates how big of a game you can create - all of your maps, data, logic, and more needs to fit into this space.`,
        type: 'dropdown',
        options: {'Don\'t care': null,'16kb': 1, '32kb': 2, '64kb': 4, '128kb': 8, '256kb': 16, '512kb': 32, '1mb+': 64},
        field: 'maxPrg',
        comparison: 'max'
        
    },
    {
        name: 'CHR Data Size (8kb)',
        description: `The amount of graphics memory the game has access to. Each 8kb can be broken into 2 4kb banks, often used for foreground and background graphics. 
                        Note that not all mappers allow separating them this way, so you may have to swap them together!`,
        type: 'dropdown',
        options: {'Don\'t care': null, '8kb': 1, '16kb': 2, '32kb': 4, '64kb': 8, '128kb': 16, '256kb': 32, '512kb+': 64},
        field: 'maxChr',
        comparison: 'max'
    },
    {
        name: 'CHR Ram Support',
        description: `Supports using ram for chr data instead of hardcoded data. This data must be stored in prg then loaded manually.`,
        type: 'radio',
        options: {'Don\'t care': null, 'Yes': true, 'No': false},
        field: 'chrRam',
        comparison: 'exact'
    },
    {
        name: 'Ad-hoc mirroring switching',
        description: `Mappers that allow you to switch between horizontal and vertical mirroring for the nametable, rather than it being hardcoded on the cartridge`,
        type: 'radio',
        options: {'Don\'t care': null, 'Yes': true, 'No': false},
        field: 'adhocMirror',
        comparison: 'exact'
    },
    {
        name: 'PRG Ram',
        descrption: `Mappers with this feature allow you to use extra ram on the cartridge to store data. Useful for complex games that have a lot of logic built in`,
        type: 'radio',
        options: {'Don\'t care': null, 'None': 0, '8kb': 1, '16kb+ (bankdswitched)': 4},
        field: 'prgRam',
        comparison: 'max'
    }
];