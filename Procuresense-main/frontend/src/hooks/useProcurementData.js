import { useEffect, useState } from 'react'
import api from '@/services/api'

export function useProcurementData() {
  const [data, setData] = useState({ analytics: null, suppliers: [], recommendations: [], reports: [], loading: true, error: null })

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [analyticsRes, suppliersRes, recommendationsRes, reportsRes] = await Promise.all([
          api.get('/api/analytics'),
          api.get('/api/suppliers'),
          api.get('/api/recommendations'),
          api.get('/api/reports'),
        ])

        if (!cancelled) {
          setData({
            analytics: analyticsRes.data?.data || analyticsRes.data || null,
            suppliers: suppliersRes.data?.data || suppliersRes.data || [],
            recommendations: recommendationsRes.data?.data || recommendationsRes.data || [],
            reports: reportsRes.data?.data || reportsRes.data || [],
            loading: false,
            error: null,
          })
        }
      } catch (error) {
        if (!cancelled) {
          setData((prev) => ({ ...prev, loading: false, error: error.message }))
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
