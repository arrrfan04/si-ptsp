'use client';

import { updateSetting } from '@/app/actions/settings';
import { useNotification } from '@/app/components/NotificationProvider';

export default function SettingForm({ settingKey, label, initialValue, icon, type = 'text', placeholder = '' }) {
  const { addNotification } = useNotification();

  const clientAction = async (formData) => {
    try {
      const val = formData.get('val');
      const res = await updateSetting(settingKey, val);
      if (res.success) {
        addNotification(`Berhasil memperbarui ${label}`, 'success');
      } else {
        addNotification(res.message || 'Gagal memperbarui pengaturan', 'error');
      }
    } catch (err) {
      addNotification('Terjadi kesalahan sistem', 'error');
    }
  };

  return (
    <form action={clientAction} style={{ 
      padding: '1.5rem', 
      background: '#F8FAFC', 
      borderRadius: '1.25rem', 
      border: '1px solid #E2E8F0', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '0.75rem' 
    }}>
      <label className="form-label-premium" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {icon && <span>{icon}</span>} {label}
      </label>
      <div className="setting-form-row">
        <input 
          type={type} 
          name="val" 
          defaultValue={initialValue} 
          className="form-input-premium" 
          placeholder={placeholder}
          style={{ flex: 1 }} 
          required 
        />
        <button type="submit" className="btn-secondary-premium">Update</button>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .setting-form-row {
          display: flex;
          gap: 0.75rem;
        }
        @media (max-width: 480px) {
          .setting-form-row {
            flex-direction: column !important;
          }
          .setting-form-row button {
            width: 100% !important;
          }
        }
      `}} />
    </form>
  );
}
