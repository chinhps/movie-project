import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  inputAnatomy.keys,
)

export const inputTheme = defineMultiStyleConfig({
  defaultProps: {
    size: '2xl',
  },
  variants: {
    auth: () => ({
      field: {
        fontWeight: '500',
        border: '1px solid',
        borderColor: 'gray.100',
        borderRadius: '5px',
        padding: '1rem 2rem',
        _placeholder: { color: 'var(--bg-gray)', fontWeight: '400' },
      },
    }),
  }
})