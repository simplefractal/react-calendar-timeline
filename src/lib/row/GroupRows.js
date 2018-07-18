import PropTypes from 'prop-types'
import React, { Component } from 'react'
import GroupRow from './GroupRow'

export default class GroupRows extends Component {
  static propTypes = {
    canvasWidth: PropTypes.number.isRequired,
    lineCount: PropTypes.number.isRequired,
    groupHeights: PropTypes.array.isRequired,
    onRowClick: PropTypes.func.isRequired,
    onRowDoubleClick: PropTypes.func.isRequired,
    clickTolerance: PropTypes.number.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return !(
      nextProps.canvasWidth === this.props.canvasWidth &&
      nextProps.lineCount === this.props.lineCount &&
      nextProps.groupHeights === this.props.groupHeights &&
      nextProps.hoveredGroupId === this.props.hoveredGroupId
    )
  }

  render() {
    const {
      canvasWidth,
      lineCount,
      groupHeights,
      onRowClick,
      onRowDoubleClick,
      onRowEnter,
      clickTolerance,
      hoveredGroupId
    } = this.props
    let lines = []
    for (let i = 0; i < lineCount; i++) {
      lines.push(
        <GroupRow
          clickTolerance={clickTolerance}
          onClick={evt => onRowClick(evt, i)}
          onDoubleClick={evt => onRowDoubleClick(evt, i)}
          key={`horizontal-line-${i}`}
          isEvenRow={i % 2 === 0}
          isLastRow={i === lineCount - 1}
          style={{
            width: `${canvasWidth}px`,
            height: `${groupHeights[i] - 1}px`
          }}
          onMouseEnter={evt => onRowEnter(evt, i)}
          isHovered={hoveredGroupId === i}
        />
      )
    }

    return <div className="rct-horizontal-lines">{lines}</div>
  }
}
