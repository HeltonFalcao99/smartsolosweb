import {AutomaticCalculation} from './consts.autoCalc';

export const GeneralQuestionsType = {
    Date: 1,
    SoilProfile: 2,
    Coordinates: 3,
    Elevation: 4,
    SlopeSituation: 5,
    Lithology: 6,
    SourceMaterial: 7,
    Stony: 8,
    Rockiness: 9,
    LocalRelief: 10,
    RegionalRelief: 11,
    Erosion: 12,
    Drainage: 13,
    Author: 14
}


export const stonyOptions = {
    type: 8,
    name: 'Stony',
    items: [
        {
            label: 'Não pedregosa',
            value: 1
        },
        {
            label: 'Ligeiramente pedregosa (<1% do terreno)',
            value: 2
        },
        {
            label: 'Moderadamente pedregosa (1 – 3% do terreno)',
            value: 3
        },
        {
            label: 'Pedregosa (3 – 15% do terreno)',
            value: 4
        },
        {
            label: 'Muito pedregosa (15 – 50% do terreno)',
            value: 5
        },
        {
            label: 'Extremamente pedregosa (50 – 90% do terreno)',
            value: 6
        }
    ],
    label: 'Pedregosidade'
}


export const rockinessOptions = [
    {label: 'Não rochosa', value: 7},
    {label: 'Ligeiramente rochosa (2 - 10% do terreno)', value: 8},
    {label: 'Moderamente rochosa (10 - 25% do terreno)', value: 9},
    {label: 'Rochosa (25 - 50% do terreno)', value: 10},
    {label: 'Muito rochosa (50 - 90% do terreno)', value: 11},
    {label: 'Extremamente rochosa (>90 do terreno)', value: 12},
];
export const LocalReliefOptions = [
    {label: 'Plano (<3% de declividade)', value: 13},
    {label: 'Suave ondulado (3 - 8% de declividade)', value: 14},
    {label: 'Ondulado (8 - 20% de declividade)', value: 15},
    {label: 'Forte ondulado (20 - 45% de declividade)', value: 15},
    {label: 'Montanhoso (45 - 75% de declividade)', value: 16},
    {label: 'Escarpado (>75% de declividade)', value: 17},
]
export const SoilProfileOptions = [
    {label: 'Trincheira', value: 'Trincheira'},
    {label: 'Tradagem', value: 'Tradagem'},
    {label: 'Barranco', value: 'Barranco'},
]


export const carateres = [
    {name: 'Petroplintico', label: 'Petroplíntico', type: 0},
    {name: 'Litoplintico', label: 'Litoplíntico', type: 1},
    {name: 'Retrátil', label: 'Retrátil', type: 2},
    {name: 'Coeso', label: 'Coeso', type: 3},
    {name: 'Sombrico', label: 'Sombrico', type: 4},
    {name: 'Redoxico', label: 'Redóxico', type: 5},
    {name: 'Fragmentario', label: 'Fragmentário', type: 6},
    {name: 'Materias_Primarios', label: 'Materias Primários', type: 7},
    {name: 'Atividades_Humanas', label: 'Atividades Humanas', type: 8},
    {name: 'Placico_Topo', label: 'Plácico Topo', type: 9}
]


export const regionalReliefs = {
    label: 'Relevo Regional',
    type: 11,
    max: 2,
    inputHeight: 125,
    name: 'RegionalRelief',
    items: [
        {
            'id': 1,
            name: '',
            children: [
                {
                    name: 'Plano (<3% de declividade)',
                    id: 112
                },
                {
                    name: 'Suave ondulado (3 – 8% de declividade)',
                    id: 113
                },
                {
                    name: 'Ondulado (8 – 20% de declividade)',
                    id: 114
                },
                {
                    name: 'Forte ondulado (20 – 45% de declividade)',
                    id: 115
                },
                {
                    name: 'Montanhoso (45 – 75% de declividade)',
                    id: 116
                },
                {
                    name: 'Escarpado (>75% de declividade)',
                    id: 117
                }
            ]
        }
    ],
    placeholder: 'Selecione no máximo 2 tipos'
}


export const erosions = {
    label: 'Erosão',
    name: 'erosão',
    type: 12,
    showDropDowns: true,
    inputHeight: 125,
    placeholder: 'Selecione o(s) tipo(s) de erosão',
    items: [
        {
            id: 1,
            max: 1,
            name: 'Laminar',
            children: [
                {
                    name: 'Laminar - Não aparente',
                    id: 21
                },
                {
                    name: 'Laminar - Ligeira',
                    id: 22
                },
                {
                    name: 'Laminar - Moderada',
                    id: 23
                },
                {
                    name: 'Laminar - Forte',
                    id: 24
                },
                {
                    name: 'Laminar - Muito forte',
                    id: 25
                },
                {
                    name: 'Laminar - Extremamente forte',
                    id: 26
                }
            ]
        },
        {
            id: 2,
            max: 1,
            name: 'Sulcos',
            children: [
                {
                    name: 'Sulcos - Não aparente',
                    id: 27
                },
                {
                    name: 'Sulcos - Ligeira',
                    id: 28
                },
                {
                    name: 'Sulcos - Moderada',
                    id: 29
                },
                {
                    name: 'Sulcos - Forte',
                    id: 30
                },
                {
                    name: 'Sulcos - Muito forte',
                    id: 31
                },
                {
                    name: 'Sulcos - Extremamente forte',
                    id: 32
                }
            ]
        },
        {
            id: 3,
            max: 1,
            name: 'Voçorocas',
            children: [
                {
                    name: 'Voçorocas - Não aparente',
                    id: 33
                },
                {
                    name: 'Voçorocas - Ligeira',
                    id: 34
                },
                {
                    name: 'Voçorocas - Moderada',
                    id: 35
                },
                {
                    name: 'Voçorocas - Forte',
                    id: 36
                },
                {
                    name: 'Voçorocas - Muito forte',
                    id: 37
                },
                {
                    name: 'Voçorocas - Extremamente forte',
                    id: 38
                }
            ]
        }
    ]
}


export const drainage = {
    label: 'Drenagem',
    name: 'Drainage',
    type: 13,
    inputType: 2,
    max: 1,
    items: [
        {
            label: 'Muito mal drenado',
            value: 39
        },
        {
            label: 'Mal drenado',
            value: 40
        },
        {
            label: 'Imperfeitamente drenado',
            value: 41
        },
        {
            label: 'Moderadamente drenado',
            value: 42
        },
        {
            label: 'Bem drenado',
            value: 43
        },
        {
            label: 'Acentuadamente drenado',
            value: 44
        },
        {
            label: 'Fortemente drenado',
            value: 45
        },
        {
            label: 'Excessivamente drenado',
            value: 46
        }
    ],
    placeholder: 'Selecione a drenagem'
}


export const InputType = {
    TextInput: 1,
    PickerInput: 2,
    MultiplePickerInput: 3,
    MunsellColorInput: 4,
    DateInput: 5,
    CoordinatesInput: 6,
    CarateresInput: 7,
    LimitInput: 8
}

export const inputCerosidadeComplementar = [

    {name: 'SuperfícieCompressão', label: 'Superfície de compressão', type: 0},
    {name: 'SuperfícieFricçãoSlickensides', label: 'Superfície de fricção (slickensides)', type: 1},


]


const PorosidadeTamanho = [
    {label: 'Sem poros visíveis', value: '++optVal'},
    {label: 'Muito pequenos', value: '++optVal'},
    {label: 'Pequenos', value: '++optVal'},
    {label: 'Médios', value: '++optVal'},
    {label: 'Grandes', value: '++optVal'},
    {label: 'Muito grandes', value: '++optVal'},
];
const PorosidadeQuantidade = [
    {label: 'Poucos', value: '++optVal'},
    {label: 'Comuns', value: '++optVal'},
    {label: 'Muitos', value: '++optVal'},
];


export const HorizonsQuestionsType = {
    'HorizonDesignation': {
        'type': 15,
        'maxLength': 5,
        'inputType': 1,
        'keyboardType': 'text',
        'name': 'horizonDesignation',
        'label': 'Designação do horizonte',
        'placeholder': 'Informe a simbologia do horizonte'
    },
    'SuperiorLimit': {
        'type': 18,
        'name': 'SuperiorLimit',
        'maxLength': 5,
        'ondulado': false,
        'inputType': InputType.LimitInput,
        'calculation': [AutomaticCalculation.Thickness],
        'keyboardType': 'number',
        'decimal': 2,
        'label': 'Limite (superior)',
        'metric': 'cm',
        'placeholder': 'Informe o limite superior do horizonte'
    },
    'InferiorLimit': {
        'type': 19,
        'name': 'InferiorLimit',
        'keyboardType': 'number',
        'maxLength': 5,
        'decimal': 2,
        'ondulado': true,
        'calculation': [AutomaticCalculation.Thickness],
        'inputType': InputType.LimitInput,
        'metric': 'cm',
        'label': 'Limite (inferior)',
        'placeholder': 'Informe o limite inferior do horizonte'
    },
    'Thickness': {
        'type': 20,
        'name': 'Thickness',
        'maxLength': 5,
        'inputType': 1,
        'keyboardType': 'number',
        'decimal': 2,
        'metric': 'cm',
        'label': 'Espessura',
        'editable': false,
        'placeholder': 'Informe a espessura do horizonte'
    },
    'Color': {
        'type': 21,
        'maxLength': 5,
        'upper': true,
        'inputType': InputType.MunsellColorInput,
        'variegado': true,
        'notifyOnChange': true,
        'name': 'Cor do solo',
        'label': 'Cor Munsell - Úmida',
        'placeholder': 'Selecione a cor'
    },
    'Color2': {
        'type': 92,
        'maxLength': 5,
        'upper': true,
        'inputType': 4,
        'name': 'Cor do solo',
        'label': 'Cor Munsell - Seca',
        'placeholder': 'Selecione a cor'
    },
    'Color3': {
        'type': 93,
        'maxLength': 5,
        'upper': true,
        'inputType': 4,
        'name': 'Cor do solo',
        'label': 'Cor Munsell - Úmida Amassada',
        'placeholder': 'Selecione a cor'
    },
    'MosqueadoQuantidade': {
        'type': 101,
        'name': 'MosqueadoQuantidade',
        'label': 'Mosqueado 1 (quantidade)',
        'max': 1,
        'placeholder': 'Informe a quantidade',
        'inputType': 2,
        'items': [
            {
                'label': 'Pouco',
                'value': 121
            },
            {
                'label': 'Comum',
                'value': 122
            },
            {
                'label': 'Abundante',
                'value': 123
            }
        ]
    },
    'MosqueadoTamanho': {
        'type': 102,
        'name': 'MosqueadoTamanho',
        'label': 'Mosqueado 1 (tamanho)',
        'max': 1,
        'placeholder': 'Informe o tamanho',
        'inputType': 2,
        'items': [
            {
                'label': 'Pequeno',
                'value': 124
            },
            {
                'label': 'Médio',
                'value': 125
            },
            {
                'label': 'Grande',
                'value': 126
            }
        ]
    },
    'MosqueadoContraste': {
        'type': 103,
        'name': 'MosqueadoContraste',
        'label': 'Mosqueado 1 (contraste)',
        'max': 1,
        'placeholder': 'Informe o contraste',
        'inputType': 2,
        'items': [
            {
                'label': 'Difuso',
                'value': 127
            },
            {
                'label': 'Distinto',
                'value': 128
            },
            {
                'label': 'Proeminente',
                'value': 129
            }
        ]
    },
    'MosqueadoQuantidade2': {
        'type': 108,
        'name': 'MosqueadoQuantidade2',
        'label': 'Mosqueado 2 (quantidade)',
        'max': 1,
        'placeholder': 'Informe a quantidade',
        'inputType': 2,
        'items': [
            {
                'label': 'Pouco',
                'value': 148
            },
            {
                'label': 'Comum',
                'value': 149
            },
            {
                'label': 'Abundante',
                'value': 150
            }
        ]
    },
    'MosqueadoTamanho2': {
        'type': 109,
        'name': 'MosqueadoTamanho2',
        'label': 'Mosqueado 2 (tamanho)',
        'max': 1,
        'placeholder': 'Informe o tamanho',
        'inputType': 2,
        'items': [
            {
                'label': 'Pequeno',
                'value': 151
            },
            {
                'label': 'Médio',
                'value': 152
            },
            {
                'label': 'Grande',
                'value': 153
            }
        ]
    },
    'MosqueadoContraste2': {
        'type': 110,
        'name': 'MosqueadoContraste2',
        'label': 'Mosqueado 2 (contraste)',
        'max': 1,
        'placeholder': 'Informe o contraste',
        'inputType': 2,
        'items': [
            {
                'label': 'Difuso',
                'value': 154
            },
            {
                'label': 'Distinto',
                'value': 155
            },
            {
                'label': 'Proeminente',
                'value': 156
            }
        ]
    },
    'Texture': {
        'type': 22,
        'name': 'Texture',
        'label': 'Textura',
        'max': 1,
        'placeholder': 'Informe a textura',
        'inputType': 2,
        'items': [
            {
                'label': 'Areia',
                'value': 47
            },
            {
                'label': 'Areia-franca',
                'value': 48
            },
            {
                'label': 'Silte',
                'value': 49
            },
            {
                'label': 'Franco-arenosa',
                'value': 50
            },
            {
                'label': 'Franco-siltosa',
                'value': 51
            },
            {
                'label': 'Franca',
                'value': 52
            },
            {
                'label': 'Franco-argilo-arenosa',
                'value': 53
            },
            {
                'label': 'Franco-argilo-siltosa',
                'value': 54
            },
            {
                'label': 'Franco-argilosa',
                'value': 55
            },
            {
                'label': 'Argilossiltosa',
                'value': 56
            },
            {
                'label': 'Argiloarenosa',
                'value': 57
            },
            {
                'label': 'Argila',
                'value': 58
            },
            {
                'label': 'Muito argilosa',
                'value': 59
            }
        ]
    },
    'TextureGravel': {
        'type': 94,
        'name': 'TextureGravel',
        'label': 'Cascalhos',
        'max': 1,
        'placeholder': 'Informe a textura',
        'inputType': 2,
        'items': [{label: 'Ausente', value: '++optVal'},
            {label: 'Pouco cascalhenta', value: '++optVal'},
            {label: 'Cascalhenta', value: '++optVal'},
            {label: 'Muito cascalhenta', value: '++optVal'}
        ]
    },
    'StructureGrade': {
        'type': 25,
        'name': 'StructureGrade',
        'label': 'Estrutura 1 (grau)',
        'max': 1,
        'placeholder': 'Informe o grau',
        'inputType': 2,
        'items': [
            {
                'label': 'Fraca',
                'value': 75,
                'classificationId': 2
            },
            {
                'label': 'Moderada',
                'value': 76,
                'classificationId': 3
            },
            {
                'label': 'Forte',
                'value': 77,
                'classificationId': 4
            }
        ]
    },
    'Size': {
        'type': 24,
        'name': 'Size',
        'label': 'Estrutura 1 (tamanho)',
        'max': 1,
        'inputType': 2,
        'placeholder': 'Informe o tamanho',
        'items': [
            {
                'label': 'Muito pequena',
                'value': 69,
                'classificationId': 1
            },
            {
                'label': 'Pequena',
                'value': 70,
                'classificationId': 2
            },
            {
                'label': 'Média',
                'value': 71,
                'classificationId': 3
            },
            {
                'label': 'Grande',
                'value': 72,
                'classificationId': 4
            },
            {
                'label': 'Muito grande',
                'value': 73,
                'classificationId': 5
            },
            {
                'label': 'Extremamente grande',
                'value': 74,
                'classificationId': -1
            }
        ]
    },
    'Shape': {
        'type': 23,
        'name': 'Shape',
        'label': 'Estrutura 1 (forma)',
        'max': 1,
        'inputType': 2,
        'placeholder': 'Informe a estrutura principal',
        'items': [
            {
                'label': 'Sem agregação - Grão simples',
                'value': 60,
                'classificationId': -1
            },
            {
                'label': 'Sem agregação - Maciça',
                'value': 61,
                'classificationId': -1
            },
            {
                'label': 'Com agregação - Laminar',
                'value': 62,
                'classificationId': 1
            },
            {
                'label': 'Com agregação - Granular',
                'value': 63,
                'classificationId': 6
            },
            {
                'label': 'Com agregação - Blocos subangulares',
                'value': 64,
                'classificationId': 5
            },
            {
                'label': 'Com agregação - Blocos angulares',
                'value': 65,
                'classificationId': 4
            },
            {
                'label': 'Com agregação - Prismática',
                'value': 66,
                'classificationId': 2
            },
            {
                'label': 'Com agregação - Cuneiforme',
                'value': 67,
                'classificationId': -1
            },
            {
                'label': 'Com agregação - Colunar',
                'value': 68,
                'classificationId': 3
            }
        ]
    },
    'StructureGrade2': {
        'type': 105,
        'name': 'StructureGrade2',
        'label': 'Estrutura 2 (grau)',
        'max': 1,
        'placeholder': 'Informe o grau',
        'inputType': 2,
        'items': [
            {
                'label': 'Fraca',
                'value': 130
            },
            {
                'label': 'Moderada',
                'value': 131
            },
            {
                'label': 'Forte',
                'value': 132
            }
        ]
    },
    'Size2': {
        'type': 106,
        'name': 'Size2',
        'label': 'Estrutura 2 (tamanho)',
        'max': 1,
        'inputType': 2,
        'placeholder': 'Informe o tamanho',
        'items': [
            {
                'label': 'Muito pequena',
                'value': 133
            },
            {
                'label': 'Pequena',
                'value': 134
            },
            {
                'label': 'Média',
                'value': 135
            },
            {
                'label': 'Grande',
                'value': 136
            },
            {
                'label': 'Muito grande',
                'value': 137
            },
            {
                'label': 'Extremamente grande',
                'value': 138
            }
        ]
    },
    'Shape2': {
        'type': 107,
        'name': 'Shape2',
        'label': 'Estrutura 2 (forma)',
        'max': 1,
        'inputType': 2,
        'placeholder': 'Informe a estrutura principal',
        'items': [
            {
                'label': 'Sem agregação - Grão simples',
                'value': 139
            },
            {
                'label': 'Sem agregação - Maciça',
                'value': 140
            },
            {
                'label': 'Com agregação - Laminar',
                'value': 141
            },
            {
                'label': 'Com agregação - Granular',
                'value': 142
            },
            {
                'label': 'Com agregação - Blocos subangulares',
                'value': 143
            },
            {
                'label': 'Com agregação - Blocos angulares',
                'value': 144
            },
            {
                'label': 'Com agregação - Prismática',
                'value': 145
            },
            {
                'label': 'Com agregação - Cuneiforme',
                'value': 146
            },
            {
                'label': 'Com agregação - Colunar',
                'value': 147
            }
        ]
    },
    'WaxinessGrade': {
        'type': 26,
        'name': 'WaxinessGrade',
        'label': 'Cerosidade (grau)',
        'max': 1,
        'inputType': 2,
        'placeholder': 'Informe o grau',
        'items': [
            {
                'label': 'Fraca',
                'value': 78,
                'classificationId': 1
            },
            {
                'label': 'Moderada',
                'value': 79,
                'classificationId': 2
            },
            {
                'label': 'Forte',
                'value': 80,
                'classificationId': 3
            }
        ]
    },
    'WaxinessQuantity': {
        'type': 27,
        'name': 'WaxinessQuantity',
        'label': 'Cerosidade (quantidade)',
        'max': 1,
        'inputType': 2,
        'placeholder': 'Informe o grau',
        'items': [
            {
                'label': 'Pouca',
                'value': 81,
                'classificationId': 1
            },
            {
                'label': 'Comum',
                'value': 82,
                'classificationId': 2
            },
            {
                'label': 'Abundante',
                'value': 83,
                'classificationId': 3
            }
        ]
    },
    'WaxinessComplement': {
        'type': 95,
        'name': 'WaxinessComplement',
        'label': 'Superfícies de compressão',
        'inputType': 7,
        'items': inputCerosidadeComplementar
    },
    'Dry': {
        'type': 28,
        'name': 'Dry',
        'label': 'Consistência (seca)',
        'max': 1,
        'inputType': 2,
        'placeholder': 'Informe a consistência',
        'items': [
            {
                'label': 'Solta',
                'value': 84
            },
            {
                'label': 'Macia',
                'value': 85
            },
            {
                'label': 'Ligeiramente dura',
                'value': 86
            },
            {
                'label': 'Dura',
                'value': 87
            },
            {
                'label': 'Muito dura',
                'value': 88
            },
            {
                'label': 'Extremamente dura',
                'value': 89
            }
        ]
    },
    'Umidity': {
        'type': 29,
        'name': 'Umidity',
        'label': 'Consistência (úmida)',
        'max': 1,
        'inputType': 2,
        'placeholder': 'Informe a consistência',
        'items': [
            {
                'label': 'Solta',
                'value': 90
            },
            {
                'label': 'Muito friável',
                'value': 91
            },
            {
                'label': 'Friável',
                'value': 92
            },
            {
                'label': 'Firme',
                'value': 93
            },
            {
                'label': 'Muito firme',
                'value': 94
            },
            {
                'label': 'Extremamente firme',
                'value': 95
            }
        ]
    },
    'PlasticityWet': {
        'type': 30,
        'name': 'PlasticityWet',
        'label': 'Plasticidade',
        'max': 1,
        'inputType': 2,
        'placeholder': 'Informe a consistência',
        'items': [
            {
                'label': 'Não plástica',
                'value': 96
            },
            {
                'label': 'Ligeiramente plástica',
                'value': 97
            },
            {
                'label': 'Plástica',
                'value': 98
            },
            {
                'label': 'Muito plástica',
                'value': 99
            }
        ]
    },
    'StickyWet': {
        'type': 31,
        'name': 'StickyWet',
        'label': 'Pegajosidade',
        'max': 1,
        'inputType': 2,
        'placeholder': 'Informe a consistência',
        'items': [
            {
                'label': 'Não pegajosa',
                'value': 100
            },
            {
                'label': 'Ligeiramente pegajosa',
                'value': 101
            },
            {
                'label': 'Pegajosa',
                'value': 102
            },
            {
                'label': 'Muito pegajosa',
                'value': 103
            }
        ]
    },
    'PorosidadeTamanho': {
        'type': 99,
        'name': 'PorosidadeTamanho',
        'label': 'Porosidade (tamanho)',
        'max': 1,
        'inputType': 2,
        'placeholder': 'Informe a porosidade',
        'items': PorosidadeTamanho
    },
    'PorosidadeQuantidade': {
        'type': 100,
        'name': 'PorosidadeQuantidade',
        'label': 'Porosidade (quantidade)',
        'max': 1,
        'inputType': 2,
        'placeholder': 'Informe a porosidade',
        'items': PorosidadeQuantidade
    },
    'TopographyForm': {
        'type': 16,
        'name': 'Topography',
        'label': 'Transição (forma)',
        'max': 1,
        'inputType': 2,
        'placeholder': 'Informe a topografia',
        'items': [
            {
                'label': 'Plana',
                'value': 104,
                'classificationId': 1
            },
            {
                'label': 'Ondulada',
                'value': 105,
                'classificationId': 2
            },
            {
                'label': 'Irregular',
                'value': 106,
                'classificationId': 3
            },
            {
                'label': 'Descontínua',
                'value': 107,
                'classificationId': 4
            }
        ]
    },
    'TopographySharpness': {
        'type': 17,
        'name': 'Sharpness',
        'label': 'Transição (nitidez)',
        'max': 1,
        'inputType': 2,
        'placeholder': 'Informe a nitidez',
        'items': [
            {
                'label': 'Abrupta',
                'value': 108,
                'classificationId': 1
            },
            {
                'label': 'Clara',
                'value': 109,
                'classificationId': 2
            },
            {
                'label': 'Gradual',
                'value': 110,
                'classificationId': 3
            },
            {
                'label': 'Difusa',
                'value': 111,
                'classificationId': 4
            }
        ]
    },
    'Carater': {
        'type': 90,
        'name': 'Caráter',
        'label': 'Caracteres',
        'inputType': 7,
        'items': carateres
    },
    'Roots': {
        'type': 32,
        'name': 'Roots',
        'label': 'Raízes',
        'inputHeight': 170,
        'showDropDowns': true,
        'inputType': 3,
        'maxLength': 150,
        'placeholder': 'Descreva as raízes',
        'items': [
            {
                'id': 1,
                'name': 'Quantidade',
                // 'max': RootsOptionsQtd.length,
                // 'children': RootsOptionsQtd
            },
            {
                'id': 2,
                'name': 'Tipo',
                // 'max': RootsOptionsType.length,
                // 'children': RootsOptionsType
            },
        ]
    },
    'Observations': {
        'type': 33,
        'name': 'Observations',
        'label': 'Observações',
        'inputType': 1,
        'maxLength': 250,
        'placeholder': 'Observações'
    },
}
