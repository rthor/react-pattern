const Case = require('./Case')
const Switch = require('./Switch')
const Adapter = require('enzyme-adapter-react-16')
const { createElement } = require('react')
const { shallow, configure } = require('enzyme')

configure({ adapter: new Adapter() })

describe('Switch', () => {
  it("shouldn't render anything with no child components", () => {
    const component = shallow(createElement(Switch))
    expect(component.exists()).toBeTruthy()
    expect(component.html()).toBeNull()
  })

  it('should render default case', () => {
    const component = shallow(
      createElement(
        Switch,
        null,
        createElement(
          Case,
          { default: true },
          createElement('p', null, 'Default')
        )
      )
    )

    expect(component.html()).toBe('<p>Default</p>')
  })

  it('should match a value', () => {
    const component = shallow(
      createElement(
        Switch,
        { value: '1' },
        createElement(Case, { when: '1' }, createElement('p', null, 'Correct')),
        createElement(
          Case,
          { when: '1' },
          createElement('p', null, 'Incorrect')
        ),
        createElement(
          Case,
          { default: true },
          createElement('p', null, 'Default')
        )
      )
    )

    expect(component.html()).toBe('<p>Correct</p>')
  })

  it('should accept a function as a when value for dynamic matches', () => {
    const component = shallow(
      createElement(
        Switch,
        { value: 2 },
        createElement(
          Case,
          { when: value => value % 2 === 0 },
          createElement('p', null, 'Correct')
        ),
        createElement(
          Case,
          { default: true },
          createElement('p', null, 'Default')
        )
      )
    )

    expect(component.html()).toBe('<p>Correct</p>')
  })

  it('should accept children render function', () => {
    const obj = { name: 'foo bar' }

    const component = shallow(
      createElement(
        Switch,
        { value: obj },
        createElement(
          Case,
          { when: null },
          createElement('p', null, 'Is null')
        ),
        createElement(Case, { default: true }, () =>
          createElement('p', null, `Name: ${obj.name}`)
        )
      )
    )

    expect(component.html()).toBe('<p>Name: foo bar</p>')
  })
})
