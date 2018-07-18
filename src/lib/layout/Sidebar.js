import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { _get, arraysEqual } from '../utility/generic'

export default class Sidebar extends Component {
  static propTypes = {
    groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    groupHeights: PropTypes.array.isRequired,
    keys: PropTypes.object.isRequired,
    groupRenderer: PropTypes.func,
    isRightSidebar: PropTypes.bool
  }

  shouldComponentUpdate(nextProps) {
    return !(
      arraysEqual(nextProps.groups, this.props.groups) &&
      nextProps.keys === this.props.keys &&
      nextProps.width === this.props.width &&
      nextProps.groupHeights === this.props.groupHeights &&
      nextProps.height === this.props.height &&
      nextProps.hoveredGroupId === this.props.hoveredGroupId
    )
  }

  renderGroupContent(group, isRightSidebar, groupTitleKey, groupRightTitleKey, groupIndex) {
    if (this.props.groupRenderer) {
      return React.createElement(this.props.groupRenderer, {
        group,
        hovered: this.props.hoveredGroupId === groupIndex,
        isRightSidebar
      })
    } else {
      return _get(group, isRightSidebar ? groupRightTitleKey : groupTitleKey)
    }
  }

  render() {
    const { width, groupHeights, height, isRightSidebar, hoveredGroupId, onRowEnter } = this.props
    const { groupIdKey, groupTitleKey, groupRightTitleKey } = this.props.keys

    const sidebarStyle = {
      width: `${width}px`,
      height: `${height}px`
    }

    const groupsStyle = {
      width: `${width}px`
    }

    let groupLines = []
    let i = 0

    this.props.groups.forEach((group, index) => {
      const elementStyle = {
        height: `${groupHeights[index] - 1}px`,
        lineHeight: `${groupHeights[index] - 1}px`
      }
      const copyI = i
      groupLines.push(
        <div
          key={_get(group, groupIdKey)}
          className={
            'rct-sidebar-row' +
            (i % 2 === 0 ? ' rct-sidebar-row-even' : ' rct-sidebar-row-odd') +
            (i === hoveredGroupId ? ' hovered' : '')
          }
          style={elementStyle}
          onMouseEnter={evt => onRowEnter(evt, copyI)}
        >
          {this.renderGroupContent(
            group,
            isRightSidebar,
            groupTitleKey,
            groupRightTitleKey,
            i
          )}
        </div>
      )
      i += 1
    })

    return (
      <div
        className={'rct-sidebar' + (isRightSidebar ? ' rct-sidebar-right' : '')}
        style={sidebarStyle}
      >
        <div style={groupsStyle}>{groupLines}</div>
      </div>
    )
  }
}
