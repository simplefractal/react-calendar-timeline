import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PreventClickOnDrag from '../interaction/PreventClickOnDrag'

class GroupRow extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    isEvenRow: PropTypes.bool.isRequired,
    style: PropTypes.object.isRequired,
    clickTolerance: PropTypes.number.isRequired
  }

  render() {
    const {
      onDoubleClick,
      isEvenRow,
      isLastRow,
      style,
      onClick,
      clickTolerance,
      onMouseEnter,
      isHovered
    } = this.props

    return (
      <PreventClickOnDrag clickTolerance={clickTolerance} onClick={onClick}>
        <div
          data-tip={isLastRow ? "" : "Click to schedule Project"}
          onDoubleClick={onDoubleClick}
          className={`${isEvenRow ? 'rct-hl-even' : 'rct-hl-odd'} ${isHovered ? 'hovered' : ''}`}
          style={style}
          onMouseEnter={onMouseEnter}
        />
      </PreventClickOnDrag>
    )
  }
}

export default GroupRow
