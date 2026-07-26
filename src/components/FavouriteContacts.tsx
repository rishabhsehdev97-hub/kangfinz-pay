import React from 'react';
import { Contact } from '../types';
import { sampleContacts } from '../data/initialData';
import { UserPlus, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface FavouriteContactsProps {
  onSelectContact: (contact: Contact) => void;
  onViewAll: () => void;
}

export const FavouriteContacts: React.FC<FavouriteContactsProps> = ({
  onSelectContact,
  onViewAll,
}) => {
  return (
    <div className="p-3.5 rounded-[18px] bg-white border border-black/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-[#0F8A5F]" />
          <h3 className="text-[15px] font-semibold text-[#1A1A1A]">Favourite Contacts</h3>
        </div>

        <button
          onClick={onViewAll}
          className="text-[11px] font-medium text-[#0F8A5F] hover:underline cursor-pointer flex items-center gap-0.5"
        >
          <span>Send More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Horizontal Scrollable Contacts Avatars */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1 px-0.5">
        {/* Add New Contact Button */}
        <button
          onClick={onViewAll}
          className="flex flex-col items-center gap-1 shrink-0 group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-emerald-50 border-2 border-dashed border-emerald-300 text-[#0F8A5F] flex items-center justify-center group-hover:scale-105 transition-transform">
            <UserPlus className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium text-gray-600">New UPI</span>
        </button>

        {/* List of Frequent Contacts */}
        {sampleContacts.map((contact) => (
          <motion.button
            key={contact.id}
            whileTap={{ scale: 0.93 }}
            onClick={() => onSelectContact(contact)}
            className="flex flex-col items-center gap-1 shrink-0 group cursor-pointer"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-[#0F8A5F] via-[#10B981] to-[#34D399] group-hover:scale-105 transition-transform shadow-2xs">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-full h-full object-cover rounded-full border-2 border-white"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-full flex items-center justify-center text-[8px] shadow-2xs">
                ⚡
              </span>
            </div>

            <div className="text-center">
              <span className="text-[12px] font-medium text-[#1A1A1A] block truncate max-w-[62px]">
                {contact.name.split(' ')[0]}
              </span>
              <span className="text-[10px] text-gray-400 block truncate max-w-[62px]">
                {contact.bankName.split(' ')[0]}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
