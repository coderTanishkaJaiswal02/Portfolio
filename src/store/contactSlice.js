import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/* ────────────────────────────────────────
   ASYNC THUNK — POST to Spring Boot API
──────────────────────────────────────── */
export const submitContact = createAsyncThunk(
  'contact/submit',
  async (formData, { rejectWithValue }) => {
    // 🔧 Change this to your live Spring Boot URL when ready
    const BACKEND_URL = 'http://localhost:8080/api/contact';

    try {
      const response = await axios.post(BACKEND_URL, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // expects { message: 'Success' } or similar response
    } catch (error) {
      const message = error.response?.data || error.message || 'Server error';
      return rejectWithValue(message);
    }
  }
);

/* ────────────────────────────────────────
   CONTACT SLICE
──────────────────────────────────────── */
const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    form: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    status: 'idle',   // 'idle' | 'loading' | 'success' | 'error'
    error: null,
  },
  reducers: {
    // Update a single form field
    setField(state, action) {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    // Reset the form back to empty
    resetForm(state) {
      state.form    = { name: '', email: '', subject: '', message: '' };
      state.status  = 'idle';
      state.error   = null;
    },
    // Clear just the status (used after success toast timeout)
    clearStatus(state) {
      state.status = 'idle';
      state.error  = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.status = 'loading';
        state.error  = null;
      })
      .addCase(submitContact.fulfilled, (state) => {
        state.status = 'success';
        state.form   = { name: '', email: '', subject: '', message: '' };
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.status = 'error';
        state.error  = action.payload ?? 'Something went wrong.';
      });
  },
});

export const { setField, resetForm, clearStatus } = contactSlice.actions;
export default contactSlice.reducer;
