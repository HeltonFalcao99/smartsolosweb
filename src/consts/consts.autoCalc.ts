export const AutomaticCalculation = {
    Thickness: {
        variables: [18, 19],
        calc: 'v2 - v1',
        to: {
            type: 20,
            name: 'Thickness'
        },
    },
    GrauFloculacao: {
        variables: [48, 49],
        calc: '((v1-v2)/v1)*100',
        to: {
            type: 50,
            name: 'GrauFloculacao'
        },
    },
    SilteArgila: {
        variables: [47, 48],
        calc: 'v1/v2',
        to: {
            type: 51,
            name: 'SilteArgila'
        },
    },
    PorosidadeTotal: {
        variables: [43, 42],
        calc: '((v1-v2)/v1)*100',
        to: {
            type: 44,
            name: 'PorosidadeTotal'
        },
    },
    RelacaoCN: {
        variables: [66, 67],
        calc: 'v1/v2',
        to: {
            type: 68,
            name: 'CN'
        },
    },
    ComplexoSortidoS: {
        variables: [54, 55, 56, 57],
        calc: 'v1 + v2 + v3 + v4',
        to: {
            type: 58,
            name: 'ComplexoSortidoS'
        },
    },
    ComplexoSortidoT: {
        variables: [58, 59, 60],
        calc: 'v1 + (v2 + v3)',
        to: {
            type: 61,
            name: 'ComplexoSortidoT'
        },
    },
    ComplexoSortidoV: {
        variables: [58, 61],
        calc: '(v1/v2)*100',
        to: {
            type: 62,
            name: 'ComplexoSortidoV'
        },
    },
    SaturacaoAluminio: {
        variables: [58, 59],
        calc: '(v2/(v1+v2))*100',
        to: {
            type: 63,
            name: 'SaturacaoAluminio'
        },
    },
    RelacaoKI: {
        variables: [69, 70],
        calc: '1.70*(v1/v2)',
        to: {
            type: 75,
            name: 'RelaçõesMolecularesSiO2AI2O3'
        },
    },
    RelacaoKR: {
        variables: [69, 70, 71],
        calc: '1.70*(v1/(v2+(v3*0.6375)))',
        to: {
            type: 76,
            name: 'RelaçõesMolecularesSiO2R2O3'
        },
    },
    RelacaoAl2O3FE2O3: {
        variables: [70, 71],
        calc: '1.57*(v1/v2)',
        to: {
            type: 77,
            name: 'RelaçõesMolecularesAlO3Fe2O3'
        },
    },
    SaturacaoSodio: {
        variables: [57, 61],
        calc: '(v1/v2)*100',
        to: {
            type: 65,
            name: 'SaturacaoSodio'
        },
    },

}
