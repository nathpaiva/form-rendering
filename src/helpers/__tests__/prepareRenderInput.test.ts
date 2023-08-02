import { buildForm } from '../prepareRenderInput'

describe('prepareRenderInput', () => {
  it('buildForm', () => {
    const form = buildForm({
      reference: null,
      name: 'What will be the service?',
      label: 'What will be the service?',
      placeholder: 'What will be the service?',
      mask: 'service type',
      type: 'enumerable',
      required: true,
      allow_multiple_value: true,
      allow_custom_value: false,
      values: {
        Coloração: 'Coloração',
        Corte: 'Corte',
        Escova: 'Escova',
        'Escova progressiva/definitiva': 'Escova progressiva/definitiva',
        Luzes: 'Luzes',
        Manicure: 'Manicure',
        Pedicure: 'Pedicure',
        Penteado: 'Penteado',
      },
      _embedded: {
        nested_fields: [],
      },
    })

    expect(typeof form).toEqual('string')
  })
})
