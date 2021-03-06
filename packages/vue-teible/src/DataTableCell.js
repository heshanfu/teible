import { dotGet } from './helpers'

export default {
  functional: true,
  props: {
    item: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    }
  },
  render (h, { props, data }) {
    if (props.column.field) {
      let value = dotGet(props.item, props.column.field)
      if (typeof value !== 'string') {
        value = JSON.stringify(value)
      }

      if (props.column.scopedSlots && typeof props.column.scopedSlots.default === 'function') {
        return h('td', data, props.column.scopedSlots.default({ value, item: props.item, column: props.column }))
      }

      return h('td', data, value)
    }

    if (props.column.scopedSlots && typeof props.column.scopedSlots.default === 'function') {
      return h('td', data, props.column.scopedSlots.default(props))
    }

    return h('td', data, props.column.children)
  }
}
