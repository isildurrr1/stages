import styles from './ValidationErrors.module.css'

interface Props {
  errors: string[]
}

export function ValidationErrors({ errors }: Props) {
  if (errors.length === 0) return null
  return (
    <div className={styles.errorBox}>
      <strong className={styles.errorTitle}>Ошибки валидации:</strong>
      <ul className={styles.errorList}>
        {errors.map((e, i) => <li key={i}>{e}</li>)}
      </ul>
    </div>
  )
}
