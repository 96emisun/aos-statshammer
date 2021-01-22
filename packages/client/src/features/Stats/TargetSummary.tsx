import { Collapse, Typography } from '@material-ui/core'
import CollapsibleCard from 'components/CollapsibleCard'
import ModifierDescription from 'components/ModifierDescription'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { ModifierDefinition } from 'types/modifierDefinition'
import { Modifier } from 'types/modifierInstance'
import Store from 'types/store'

const TargetSummary = () => {
  const definitions = useSelector((state: Store) => state.modifiers.targetModifiers)
  const modifiers = useSelector((state: Store) => state.target.modifiers.filter(m => !m.disabled))

  const data = useMemo(
    () =>
      modifiers.reduce((acc, m) => {
        const def = definitions.find(d => d.id === m.type)
        return def ? [...acc, { definition: def, modifier: m }] : acc
      }, new Array<{ definition: ModifierDefinition; modifier: Modifier }>()),
    [definitions, modifiers]
  )

  return (
    <Collapse in={!!modifiers && !!modifiers.length}>
      <CollapsibleCard title="Target Summary">
        <div>
          {data.map(({ modifier, definition }) => (
            <Typography style={{ paddingBottom: '10px' }}>
              <strong>{definition.name}</strong>
              <ModifierDescription modifier={modifier} definition={definition} variant="body2" simple />
            </Typography>
          ))}
        </div>
      </CollapsibleCard>
    </Collapse>
  )
}

export default React.memo(TargetSummary)
