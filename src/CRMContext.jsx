// contexts/CRMContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  leadScore: number;
  status: 'active' | 'inactive';
  createdAt: string;
  lastContact: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  value: number;
  probability: number;
  expectedCloseDate: string;
  assignedTo: string;
  createdAt: string;
}

interface Deal {
  id: string;
  title: string;
  contactId: string;
  value: number;
  stage: string;
  probability: number;
  expectedCloseDate: string;
  assignedTo: string;
  notes: string;
  createdAt: string;
}

interface CRMContextType {
  contacts: Contact[];
  leads: Lead[];
  deals: Deal[];
  fetchContacts: () => Promise<void>;
  fetchLeads: () => Promise<void>;
  fetchDeals: () => Promise<void>;
  addContact: (contact: Omit<Contact, 'id' | 'createdAt'>) => Promise<void>;
  updateContact: (id: string, contact: Partial<Contact>) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => Promise<void>;
  updateLead: (id: string, lead: Partial<Lead>) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};

interface CRMProviderProps {
  children: ReactNode;
}

export const CRMProvider: React.FC<CRMProviderProps> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts', {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads', {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  const fetchDeals = async () => {
    try {
      const response = await fetch('/api/deals', {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        setDeals(data);
      }
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  };

  const addContact = async (contact: Omit<Contact, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(contact)
      });
      if (response.ok) {
        await fetchContacts();
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const updateContact = async (id: string, contact: Partial<Contact>) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(contact)
      });
      if (response.ok) {
        await fetchContacts();
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const deleteContact = async (id: string) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (response.ok) {
        await fetchContacts();
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const addLead = async (lead: Omit<Lead, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(lead)
      });
      if (response.ok) {
        await fetchLeads();
      }
    } catch (error) {
      console.error('Error adding lead:', error);
    }
  };

  const updateLead = async (id: string, lead: Partial<Lead>) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(lead)
      });
      if (response.ok) {
        await fetchLeads();
      }
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const deleteLead = async (id: string) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (response.ok) {
        await fetchLeads();
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  return (
    <CRMContext.Provider value={{
      contacts,
      leads,
      deals,
      fetchContacts,
      fetchLeads,
      fetchDeals,
      addContact,
      updateContact,
      deleteContact,
      addLead,
      updateLead,
      deleteLead
    }}>
      {children}
    </CRMContext.Provider>
  );
};
