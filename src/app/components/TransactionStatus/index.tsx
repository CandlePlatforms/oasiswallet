/**
 *
 * TransactionStatus
 *
 */
import { Box, Text } from 'grommet'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorPayload } from 'types/errors'
import { ErrorFormatter } from '../ErrorFormatter'

interface Props {
  error?: ErrorPayload
  success?: boolean
}

export const TransactionStatus = memo((props: Props) => {
  const { error, success } = props
  const { t } = useTranslation()

  return (
    <>
      {error && (
        <Box
          border={{
            color: 'status-error',
            side: 'left',
            size: '3px',
          }}
          background={{
            color: 'status-error',
            opacity: 'weak',
          }}
          pad={{ horizontal: 'small', vertical: 'xsmall' }}
        >
          <Text weight="bold">
            <ErrorFormatter code={error.code} message={error.message} />
          </Text>
        </Box>
      )}
      {success && (
        <Box
          border={{
            color: 'status-ok',
            side: 'left',
            size: '3px',
          }}
          background={{
            color: 'status-ok',
            opacity: 'weak',
          }}
          pad={{ horizontal: 'small', vertical: 'xsmall' }}
        >
          <Text weight="bold">
            {t(
              'account.sendTransaction.success',
              'Transaction successfully sent. The transaction might take up to a minute to appear on your account.',
            )}
          </Text>
        </Box>
      )}
    </>
  )
})
