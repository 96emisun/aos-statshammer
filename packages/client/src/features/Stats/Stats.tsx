import { makeStyles, Theme } from '@material-ui/core'
import { getComparison } from 'api/comparison'
import CollapsibleCard from 'components/CollapsibleCard'
import TableSkeleton from 'components/Skeletons/TableSkeleton'
import isEqual from 'lodash/isEqual'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeUnitsSelector } from 'store/selectors/unitsSelectors'
import Store from 'types/store'
import { NameMapping, Unit } from 'types/store/units'

import ComparisonGraphs from './ComparisonGraphs'
import ComparisonTable from './ComparisonTable'
import TargetSummary from './TargetSummary'

function getNameMapping(units: Unit[]): NameMapping {
  return units.reduce<NameMapping>((acc, { id, name }) => ({ ...acc, [id]: name }), {})
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
}))

const Stats = () => {
  const classes = useStyles()
  const units = useSelector(activeUnitsSelector, isEqual)
  const target = useSelector((state: Store) => state.target, isEqual)
  const { results, pending } = useSelector((state: Store) => state.comparison)
  const dispatch = useDispatch()
  const nameMapping = useMemo(() => getNameMapping(units), [units])

  useEffect(() => {
    dispatch(getComparison({ units: units }))
  }, [dispatch, units, target])

  return (
    <div className={classes.root}>
      <TargetSummary />
      <CollapsibleCard title="Average Damage Table">
        {pending ? (
          <TableSkeleton rows={units.length + 1} columns={3} dense />
        ) : (
          <ComparisonTable nameMapping={nameMapping} results={results} />
        )}
      </CollapsibleCard>
      <CollapsibleCard title="Graphs">
        <ComparisonGraphs nameMapping={nameMapping} results={results} pending={pending} />
      </CollapsibleCard>
    </div>
  )
}

export default React.memo(Stats)
