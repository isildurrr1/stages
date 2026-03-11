import { useCallback, useMemo, useRef, useState } from 'react'
import {
  StagesTable,
  PreviewTable,
  ValidationErrors,
  validateTableData,
  computePreview,
} from '../../../features/edit-stage-numbering'
import { MOCK_DATA } from '../../../entities/stage'
import type { TableRow, PreviewRow } from '../../../entities/stage'
import { REQUEST_TYPES, REQUEST_NUMBERS } from '../../../shared/config/requestOptions'
import styles from './ChangeStagesPage.module.css'

export function ChangeStagesPage() {
  const [requestType, setRequestType] = useState('ЗНР')
  const [requestNumber, setRequestNumber] = useState('')
  const [tableData, setTableData] = useState<TableRow[]>([])
  const [searched, setSearched] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [visibleCount, setVisibleCount] = useState(30)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [previewData, setPreviewData] = useState<PreviewRow[] | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const loadingRef = useRef(false)

  const isValid = requestType !== '' && requestNumber !== ''

  const handleSearch = () => {
    if (!isValid) return
    setTableData(MOCK_DATA)
    setVisibleCount(30)
    setSearched(true)
    setPreviewData(null)
    setValidationErrors([])
  }

  const handleSetEditMode = (value: boolean) => {
    setEditMode(value)
    if (!value) {
      setPreviewData(null)
      setValidationErrors([])
    }
  }

  const handleRecalculate = () => {
    const errors = validateTableData(tableData)
    setValidationErrors(errors)
    if (errors.length === 0) {
      setPreviewData(computePreview(tableData))
    } else {
      setPreviewData(null)
    }
  }

  const handleSave = () => {
    const errors = validateTableData(tableData)
    setValidationErrors(errors)
    if (errors.length > 0) return
    console.log('Saving data:', tableData)
    setPreviewData(null)
    setEditMode(false)
  }

  const handleClear = () => {
    setRequestType('ЗНР')
    setRequestNumber('')
    setTableData([])
    setVisibleCount(30)
    setSearched(false)
    setEditMode(false)
    setPreviewData(null)
    setValidationErrors([])
  }

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    if (scrollHeight - scrollTop - clientHeight < 120 && !loadingRef.current) {
      setVisibleCount(prev => {
        if (prev >= MOCK_DATA.length) return prev
        loadingRef.current = true
        setIsLoadingMore(true)
        setTimeout(() => {
          setVisibleCount(c => Math.min(c + 30, MOCK_DATA.length))
          setIsLoadingMore(false)
          loadingRef.current = false
        }, 400)
        return prev
      })
    }
  }, [])

  const handleCellChange = useCallback((rowIndex: number, field: string, value: number) => {
    setTableData(prev => prev.map((r, i) => i === rowIndex ? { ...r, [field]: value } : r))
  }, [])

  const data = useMemo(() => tableData.slice(0, visibleCount), [tableData, visibleCount])

  return (
    <div className={styles.page}>
      <div className={styles.titleRow}>
        <h1 className={styles.pageTitle}>Изменение этапности</h1>
        <button className={styles.btnSettings}>&#9881; Настроить вид</button>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Поиск</h2>
        <div className={styles.searchFields}>
          <div className={styles.field}>
            <label className={styles.label}>
              Тип заявки <span className={styles.required}>*</span>
            </label>
            <select
              className={styles.select}
              value={requestType}
              onChange={e => setRequestType(e.target.value)}
            >
              <option value="">— выберите —</option>
              {REQUEST_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>
              Номер заявки <span className={styles.required}>*</span>
            </label>
            <select
              className={styles.select}
              value={requestNumber}
              onChange={e => setRequestNumber(e.target.value)}
            >
              <option value="">— выберите —</option>
              {REQUEST_NUMBERS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.btnSecondary} onClick={handleClear}>
            Очистить поиск
          </button>
          <button className={styles.btnPrimary} onClick={handleSearch} disabled={!isValid}>
            Искать
          </button>
        </div>
      </section>

      <section className={styles.section}>
        <StagesTable
          data={data}
          tableData={tableData}
          editMode={editMode}
          searched={searched}
          visibleCount={visibleCount}
          isLoadingMore={isLoadingMore}
          onScroll={handleScroll}
          onEditModeChange={handleSetEditMode}
          onRecalculate={handleRecalculate}
          onSave={handleSave}
          onCellChange={handleCellChange}
        />
      </section>

      <ValidationErrors errors={validationErrors} />

      {previewData && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Предварительный результат</h2>
          <PreviewTable data={previewData} />
        </section>
      )}
    </div>
  )
}
