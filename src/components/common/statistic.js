import React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'
import { FormatNumber } from '~components/utils/format'
import statisticStyles from './statistic.module.scss'

const Statistic = ({
  title,
  value,
  suffix,
  children,
  subelement,
  hideValue,
  grey,
  asterisk = false,
  noDefinitionLink,
}) => {
  // return nothing if the value is -1 (means that this should be hidden)
  if (value === -1) {
    return <></>
  }

  return (
    <div
      className={classnames(
        statisticStyles.statisticWrapper,
        subelement && statisticStyles.subelement,
        noDefinitionLink && statisticStyles.noDefinitionLink,
        grey && statisticStyles.grey,
      )}
    >
      <div className={statisticStyles.statistic}>
        <div
          className={classnames(
            statisticStyles.title,
            hideValue && statisticStyles.fullWidth,
          )}
        >
          {title}
        </div>
        <div
          className={classnames(
            statisticStyles.value,
            value === null && statisticStyles.nullValue,
            asterisk === '' && statisticStyles.noAsterisk,
          )}
        >
          {!hideValue && <NumberOrNotReported value={value} />}
          {suffix}
          {asterisk === '*' && '*'}
        </div>
        {children && <div className={statisticStyles.info}>{children}</div>}
      </div>
    </div>
  )
}

const NumberOrNotReported = ({ value }) => {
  /*
  This allows for conditional styles,
  which FormatNumber does not support on its own.
  */
  if (value || value === 0) {
    return <FormatNumber number={value} />
  }
  return <span className={statisticStyles.notReported}>Not Reported</span>
}

const StatisticLink = ({ to, children }) => (
  <Link to={to} className={statisticStyles.link}>
    {children}
  </Link>
)

const DefinitionLink = ({ onDefinitionsToggle, label, title = false }) => {
  return (
    <button
      className={statisticStyles.link}
      onClick={onDefinitionsToggle}
      type="button"
      aria-label={`Definition of ${label}`}
    >
      {title || <>Definition</>}
    </button>
  )
}

const StatisticGroup = ({ children }) => (
  <div className={statisticStyles.group}>{children}</div>
)

const DrillDown = ({ label, value, suffix, calculated = false }) => (
  <div className={statisticStyles.drillDown}>
    <span className={statisticStyles.label}>
      {label}
      {calculated && (
        <div className={statisticStyles.calculated} aria-hidden>
          {' '}
          (Calculated)
        </div>
      )}
    </span>
    <span className={statisticStyles.value}>
      <NumberOrNotReported value={value} />
      {suffix}
    </span>
  </div>
)

export { DrillDown, Statistic, StatisticGroup, StatisticLink, DefinitionLink }
