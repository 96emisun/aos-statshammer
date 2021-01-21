import { Dispatch } from '@reduxjs/toolkit'
import { comparisonStore } from 'store/slices'
import { ComparisonRequest, ComparisonResponse } from 'types/store/comparison'
import { Unit } from 'types/store/units'

import { post, unitIdResponseProcessor } from './helpers'

export const getComparison = ({ units }: { units: Unit[] }) => async (dispatch: Dispatch) => {
  const { comparisonPending, comparisonSucess, comparisonError } = comparisonStore.actions
  dispatch(comparisonPending())
  try {
    if (!units || !units.length) dispatch(comparisonSucess({ results: [] }))
    const res = await post<ComparisonRequest, ComparisonResponse>({
      path: '/compare',
      body: { units },
      responseProcessor: unitIdResponseProcessor,
    })
    dispatch(comparisonSucess(res))
  } catch (error) {
    console.error(error)
    dispatch(comparisonError())
  }
}
