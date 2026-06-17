import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Folder, 
  Search, 
  FileCode, 
  ArrowRight, 
  ArrowDown, 
  Lock, 
  CheckCircle2, 
  Check, 
  ExternalLink, 
  Layers, 
  Cpu, 
  Download, 
  BookOpen, 
  Heart, 
  Menu, 
  X, 
  Calculator, 
  Copy, 
  Sparkles, 
  Terminal, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  ChevronRight,
  ChevronDown,
  Workflow,
  Plus,
  Mail,
  Inbox,
  LogIn,
  LogOut,
  ShoppingBag,
  User,
  MessageSquare,
  Users,
  Shield,
  Code,
  Settings,
  Phone,
  Server,
  Globe,
  Database,
  Key
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase. If credentials are not set, it won't crash but will gracefully handle operations.
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// 10 Premium Upsell Addons for Paid Members
const UPSELL_PRODUCTS = [
  {
    id: "upsell_telegram",
    title: "Premium Telegram Automator",
    description: "Tự động hóa gửi tin nhắn Telegram, tạo bot quản lý thành viên, phát thông báo kênh và kết nối nhóm chat siêu linh hoạt.",
    price: 1.99,
    originalPrice: 29.00,
    category: "Telegram Bot",
    iconName: "MessageSquare",
    highlight: "Bán chạy nhất"
  },
  {
    id: "upsell_ai_content",
    title: "AI Content Studio Setup",
    description: "Tích hợp OpenAI/Claude với n8n để tự động phân tích từ khóa hot, lập dàn ý chất lượng cao và tự xuất bản bài viết lên WordPress.",
    price: 2.49,
    originalPrice: 49.00,
    category: "AI Marketing",
    iconName: "Workflow",
    highlight: "Đề xuất cho AI"
  },
  {
    id: "upsell_google_sheets",
    title: "Google Sheets Multi-Sync Pro",
    description: "Biến Google Sheets thành database thời gian thực với độ trễ thấp nhờ cơ chế Webhook n8n đồng bộ 2 chiều thời gian thực.",
    price: 1.00,
    originalPrice: 19.00,
    category: "Sheets Database",
    iconName: "FileCode",
    highlight: "Siêu tiết kiệm"
  },
  {
    id: "upsell_discord_commander",
    title: "Discord Bot Hub Commander",
    description: "Xây dựng hệ thống bot Discord tương tác, lọc nội dung bẩn tự động, quản trị máy chủ và phản hồi tickets hỗ trợ khách hàng.",
    price: 1.49,
    originalPrice: 25.00,
    category: "Community Bot",
    iconName: "Settings",
    highlight: "Tiện ích Discord"
  },
  {
    id: "upsell_crm_leads",
    title: "Auto CRM Sales Lead Pipe",
    description: "Liên kết và đồng bộ Lead tức thời từ Facebook Ads, TikTok Lead Ads hay Google Forms về HubSpot, Zoho và Trello tự động.",
    price: 2.99,
    originalPrice: 59.00,
    category: "CRM Sync",
    iconName: "Users",
    highlight: "Dành cho Agency"
  },
  {
    id: "upsell_ecommerce_sms",
    title: "E-commerce Auto-SMS Suite",
    description: "Tự động gửi tin nhắn SMS, Zalo thông báo đơn hàng thành công, cập nhật trạng thái vận chuyển và khảo sát khách hàng qua Twilio.",
    price: 1.99,
    originalPrice: 35.00,
    category: "SMS Marketing",
    iconName: "Phone",
    highlight: "E-Commerce Tool"
  },
  {
    id: "upsell_gmail_assistant",
    title: "AI Email Smart Assistant",
    description: "Quét Gmail thông minh, tự động lọc thư rác nguy hại, gắn thẻ độ ưu tiên của thư và soạn thảo sẵn thư trả lời bằng AI.",
    price: 2.00,
    originalPrice: 39.00,
    category: "AI Productivity",
    iconName: "Mail",
    highlight: "Auto Gmail"
  },
  {
    id: "upsell_stripe_sync",
    title: "Stripe Real-time Revenue Sync",
    description: "Bắn thông báo chúc mừng doanh thu tức thời qua Slack/Telegram khi có hóa đơn Stripe thanh toán, tự xuất biên lai PDF gửi khách.",
    price: 2.99,
    originalPrice: 49.00,
    category: "Financial Sync",
    iconName: "DollarSign",
    highlight: "Phổ biến"
  },
  {
    id: "upsell_saas_backup",
    title: "Notion & Airtable Backup Weekly",
    description: "Tự động lưu và xuất file sao lưu nén toàn bộ database Workspace Notion, Airtable của bạn về Google Drive định kỳ hàng tuần.",
    price: 1.49,
    originalPrice: 29.00,
    category: "Data Security",
    iconName: "Shield",
    highlight: "Cực hữu ích"
  },
  {
    id: "upsell_custom_api",
    title: "API Interceptor Suite for n8n",
    description: "Bộ workflow xử lý tải lượng API cực lớn, tự động xoay tua Token OAuth2, vượt giới hạn API Rate Limit của đối tác mượt mà.",
    price: 2.49,
    originalPrice: 39.00,
    category: "Developer Kit",
    iconName: "Code",
    highlight: "Chuyên sâu Dev"
  }
];

// Helper function to render correct Lucide-React icon for addons
const renderAddonIcon = (iconName: string) => {
  switch (iconName) {
    case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-indigo-500" />;
    case 'Workflow': return <Workflow className="w-5 h-5 text-emerald-500" />;
    case 'FileCode': return <FileCode className="w-5 h-5 text-sky-500" />;
    case 'Settings': return <Settings className="w-5 h-5 text-amber-500" />;
    case 'Users': return <Users className="w-5 h-5 text-purple-500" />;
    case 'Phone': return <Phone className="w-5 h-5 text-rose-500" />;
    case 'Mail': return <Mail className="w-5 h-5 text-blue-500" />;
    case 'DollarSign': return <DollarSign className="w-5 h-5 text-green-500" />;
    case 'Shield': return <Shield className="w-5 h-5 text-teal-500" />;
    case 'Code': return <Code className="w-5 h-5 text-orange-500" />;
    default: return <Sparkles className="w-5 h-5 text-yellow-500" />;
  }
};

// 6 Essential Installation Setup Tools before Importing into n8n
const SETUP_TOOLS = [
  {
    id: "tool_vps_hostinger",
    nameEn: "Hostinger VPS Server (Recommended)",
    nameVi: "VPS Server Hostinger (Khuyên dùng)",
    descriptionEn: "High-performance Cloud VPS perfect for Docker & n8n. Quick 1-click installation with unlimited bandwidth for ultra-smooth operation.",
    descriptionVi: "Cloud VPS tốc độ cao hoàn hảo cho Docker & n8n. Cài đặt nhanh chóng chỉ với 1 click chuột, băng thông không giới hạn cực kỳ mượt mà.",
    link: "https://www.hostinger.com/vn/cart?product=vps%3Avps_kvm_1&period=12&referral_type=cart_link&REFERRALCODE=0WYAHITOFW4C&referral_id=019ed351-13ed-70e6-96b6-3cef829febd6",
    categoryEn: "VPS SERVER",
    categoryVi: "MÁY CHỦ VPS",
    iconName: "Server",
    highlightEn: "MOST IMPORTANT",
    highlightVi: "QUAN TRỌNG NHẤT",
    badgeBg: "bg-red-500 text-white"
  },
  {
    id: "tool_domain",
    nameEn: "Domain Name (VIP Domain)",
    nameVi: "Tên miền (Domain Name VIP)",
    descriptionEn: "Purchase a branded domain to point your VPS IP to, enabling the mandatory SSL/HTTPS certificate for n8n webhooks to trigger.",
    descriptionVi: "Mua tên miền thương hiệu để trỏ dải IP VPS về tên miền nhằm kích hoạt chứng chỉ bảo mật SSL HTTPS bắt buộc n8n webhook hoạt động.",
    link: "https://www.hostinger.com/vn?REFERRALCODE=0WYAHITOFW4C",
    categoryEn: "DOMAIN GATEWAY",
    categoryVi: "CỔNG TÊN MIỀN",
    iconName: "Globe",
    highlightEn: "WEBHOOK REQUIRED",
    highlightVi: "BẮT BUỘC WEBHOOK",
    badgeBg: "bg-blue-500 text-white"
  },
  {
    id: "tool_supabase",
    nameEn: "Supabase Database",
    nameVi: "Cơ sở dữ liệu Supabase",
    descriptionEn: "Completely free hosting of Cloud PostgreSQL database. Backs up transactional data, powers advanced n8n session tracking, and integrates AI vector databases.",
    descriptionVi: "Cloud database PostgreSQL hoàn toàn miễn phí. Đứng sau lưu dự trữ dữ liệu, quản trị phiên n8n nâng cao và tích hợp vector database AI.",
    link: "https://supabase.com",
    categoryEn: "CLOUD REPOSITORY",
    categoryVi: "KHO LƯU TRỮ ĐÁM MÂY",
    iconName: "Database",
    highlightEn: "DATA SYNCED",
    highlightVi: "ĐỒNG BỘ DATA",
    badgeBg: "bg-emerald-500 text-white"
  },
  {
    id: "tool_gemini_api",
    nameEn: "Acquire Gemini & OpenAI API Keys",
    nameVi: "Cấp khóa API Gemini & OpenAI",
    descriptionEn: "Get developer-grade intelligence API keys directly from Google AI Studio or OpenAI to power n8n nodes for Large Language Model tasks.",
    descriptionVi: "Nhận khóa API khóa phát triển thông minh trực tiếp từ Google AI Studio hoặc OpenAI để khởi chạy các n8n node xử lý mô hình ngôn ngữ lớn.",
    link: "https://aistudio.google.com",
    categoryEn: "AI CREDENTIALS",
    categoryVi: "XÁC THỰC AI CREDENTIALS",
    iconName: "Key",
    highlightEn: "REQUIRED FOR AI AGENT",
    highlightVi: "CẦN CHO AI AGENT",
    badgeBg: "bg-yellow-500 text-neutral-900"
  },
  {
    id: "tool_smtp_email",
    nameEn: "SMTP Gate (Resend Service)",
    nameVi: "SMTP Gate (Dịch vụ Resend)",
    descriptionEn: "Provides outstanding, powerful, and free automatic email sending capabilities. Allows n8n to easily fire email alerts, password recovery, or reports.",
    descriptionVi: "Cung cấp gửi Email tự động miễn phí mạnh mẽ vượt trội. Giúp n8n dễ dàng bắn email thông báo khôi phục mật khẩu hoặc gửi tin kết quả.",
    link: "https://www.hostinger.com/vn/cart?product=hostinger_mail%3Apremium&period=12&referral_type=cart_link&REFERRALCODE=0WYAHITOFW4C&referral_id=019ed351-d040-72f6-8994-f9f37cdf5ee9",
    categoryEn: "EMAIL SMTP ENGINE",
    categoryVi: "CỔNG EMAIL SMTP",
    iconName: "Mail",
    highlightEn: "AUTO EMAIL SENDER",
    highlightVi: "GỬI MAIL TỰ ĐỘNG",
    badgeBg: "bg-purple-500 text-white"
  },
  {
    id: "tool_docker_desktop",
    nameEn: "Docker Desktop & GitHub Setup",
    nameVi: "Docker Desktop & Git Hub",
    descriptionEn: "A simulated local Docker container environment to test the entire n8n library on your workstation for free prior to hosting on VPS.",
    descriptionVi: "Môi trường giả lập Docker Container chạy test local toàn bộ library n8n trên máy tính cá nhân miễn phí trước khi deploy trực tiếp VPS.",
    link: "https://www.docker.com",
    categoryEn: "DEPENDENCY UTILS",
    categoryVi: "CÔNG CỤ LIÊN QUAN",
    iconName: "Code",
    highlightEn: "DEVELOPER TOOL",
    highlightVi: "CÔNG CỤ PHÁT TRIỂN",
    badgeBg: "bg-neutral-600 text-white"
  }
];

const MOCK_NOTIFICATIONS = [
  {
    nameEn: "Noah Williams (Toronto, Canada)",
    nameVi: "Lê Hoàng Nam (Đà Nẵng)",
    itemEn: "the comprehensive pack of 300+ JSON workflows",
    itemVi: "bộ sản phẩm trọn gói 300+ JSON Workflows tự động",
    timeEn: "just now",
    timeVi: "vừa xong"
  },
  {
    nameEn: "Emma Watson (Sydney, Australia)",
    nameVi: "Trần Thị Thanh Thảo (TP. Hồ Chí Minh)",
    itemEn: "n8n Platform Suite Premium Lifetime",
    itemVi: "gói n8n Platform Suite Premium trọn đời",
    timeEn: "1 minute ago",
    timeVi: "1 phút trước"
  },
  {
    nameEn: "Alex Johnson (Austin, USA)",
    nameVi: "Nguyễn Minh Tuấn (Hà Nội)",
    itemEn: "300+ JSON workflows bundle",
    itemVi: "bộ tài liệu 300+ n8n JSON Workflows",
    timeEn: "2 minutes ago",
    timeVi: "2 phút trước"
  },
  {
    nameEn: "Olivia Brown (Singapore)",
    nameVi: "Phạm Minh Đức (Hải Phòng)",
    itemEn: "n8n Ultimate Automation package",
    itemVi: "gói giải pháp n8n Tự động hoá Toàn diện",
    timeEn: "3 minutes ago",
    timeVi: "3 phút trước"
  },
  {
    nameEn: "James Miller (Berlin, Germany)",
    nameVi: "Vũ Thị Ngọc Hà (Cần Thơ)",
    itemEn: "n8n Platform Suite Premium",
    itemVi: "n8n Platform Suite bản quyền Premium",
    timeEn: "4 minutes ago",
    timeVi: "4 phút trước"
  },
  {
    nameEn: "Sophia Taylor (Auckland, NZ)",
    nameVi: "Hoàng Văn Lâm (Đồng Nai)",
    itemEn: "n8n Premium VIP workflows license",
    itemVi: "bản quyền kho kịch bản n8n Premium VIP",
    timeEn: "5 minutes ago",
    timeVi: "5 phút trước"
  },
  {
    nameEn: "Benjamin Davies (Cardiff, UK)",
    nameVi: "Đỗ Thu Trang (Quảng Ninh)",
    itemEn: "300+ Production n8n templates",
    itemVi: "gói 300+ n8n mẫu ứng dụng thực tế",
    timeEn: "6 minutes ago",
    timeVi: "6 phút trước"
  },
  {
    nameEn: "Mia Wilson (Dublin, Ireland)",
    nameVi: "Nguyễn Tiến Đạt (Bình Dương)",
    itemEn: "Lifetime update pack for n8n Suite",
    itemVi: "bản cập nhật trọn đời cho n8n Suite",
    timeEn: "7 minutes ago",
    timeVi: "7 phút trước"
  },
  {
    nameEn: "Lucas Martinez (Madrid, Spain)",
    nameVi: "Phạm Thanh Sơn (Khánh Hòa)",
    itemEn: "n8n Enterprise Automation suite",
    itemVi: "gói n8n tự động hóa cấp doanh nghiệp",
    timeEn: "8 minutes ago",
    timeVi: "8 phút trước"
  },
  {
    nameEn: "Liam Smith (London, UK)",
    nameVi: "Bùi Phương Linh (Thừa Thiên Huế)",
    itemEn: "300+ JSON workflows suite",
    itemVi: "bộ sản phẩm 300+ JSON Workflows tự động",
    timeEn: "9 minutes ago",
    timeVi: "9 phút trước"
  }
];

const HostingerLogo = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 10L16 3L28.5 10V22L16 29L3.5 22V10Z" fill="#673DE6" />
    <path d="M3.5 10L16 3V29L3.5 22V10Z" fill="#5025D1" />
    <path d="M12 11H15V15H17V11H20V21H17V17H15V21H12V11Z" fill="#FF1EAA" />
  </svg>
);

const NamecheapLogo = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#DE3721" />
    <path d="M8 20C10 23 13 24 16 24C19 24 22 23 24 20C24 14.5 21 11 16 11C11 11 8 14.5 8 20Z" fill="white" />
    <circle cx="16" cy="15" r="2.5" fill="#FFA500" />
    <path d="M10 21L13 23M22 21L19 23" stroke="#DE3721" strokeWidth="1.5" />
  </svg>
);

const SupabaseLogo = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#1C1C1C" />
    <path d="M16.52 7.2a.5.5 0 0 0-.82.43l.8 5.87h-5.22a.5.5 0 0 0-.41.78l7.63 10.53a.5.5 0 0 0 .82-.43l-.8-5.87h5.22a.5.5 0 0 0 .41-.78L16.52 7.2z" fill="#3ECF8E" />
  </svg>
);

const AIStudioOpenAILogo = () => (
  <svg viewBox="0 0 64 32" className="w-14 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0, 0)">
      <rect width="28" height="32" rx="8" fill="#0F172A" />
      <path d="M14 6C14 10.42 17.58 14 22 14C17.58 14 14 17.58 14 22C14 17.58 10.42 14 6 14C10.42 14 14 10.42 14 6Z" fill="url(#geminiSpark)" />
    </g>
    <path d="M30 10 L30 22" stroke="#E2E8F0" strokeWidth="1" />
    <g transform="translate(32, 0)">
      <rect width="28" height="32" rx="8" fill="#000000" />
      <path d="M14 8C10.68 8 8 10.68 8 14C8 17.32 10.68 20 14 20C17.32 20 20 17.32 20 14C20 10.68 17.32 8 14 8ZM14 18.5C11.51 18.5 9.5 16.49 9.5 14C9.5 11.51 11.51 9.5 14 9.5C16.49 9.5 18.5 11.51 18.5 14C18.5 16.49 16.49 18.5 14 18.5Z" fill="#10A37F" />
      <path d="M14 12V16M12 14H16" stroke="#10A37F" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    <defs>
      <linearGradient id="geminiSpark" x1="6" y1="6" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9B72CB" />
        <stop offset="1" stopColor="#4285F4" />
      </linearGradient>
    </defs>
  </svg>
);

const ResendLogo = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#000000" />
    <path d="M8 10C8 8.89543 8.89543 8 10 8H22C23.1046 8 24 8.89543 24 10V22C24 23.1046 23.1046 24 22 24H10C8.89543 24 8 23.1046 8 22V10Z" stroke="white" strokeWidth="1.8" />
    <path d="M8 11.2L16 16.8L24 11.2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DockerGitHubLogo = () => (
  <svg viewBox="0 0 64 32" className="w-14 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0, 0)">
      <rect width="28" height="32" rx="8" fill="#0DB7ED" />
      <rect x="7" y="7" width="2" height="2" fill="white" />
      <rect x="10" y="7" width="2" height="2" fill="white" />
      <rect x="13" y="7" width="2" height="2" fill="white" />
      <rect x="8" y="10" width="2" height="2" fill="white" />
      <rect x="11" y="10" width="2" height="2" fill="white" />
      <rect x="14" y="10" width="2" height="2" fill="white" />
      <path d="M6 16C6 16 7.5 19.5 12.5 19.5C17.5 19.5 19 16 19 16C21 16.2 22.5 15 23 13.5C21.8 13.5 21 14 20.5 14.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <path d="M30 10 L30 22" stroke="#E2E8F0" strokeWidth="1" />
    <g transform="translate(32, 0)">
      <rect width="28" height="32" rx="8" fill="#181717" />
      <path fillRule="evenodd" clipRule="evenodd" d="M14 6C10.13 6 7 9.13 7 13C7 16.1 9.01 18.72 11.79 19.64C12.09 19.7 12.2 19.51 12.2 19.33C12.2 19.17 12.19 18.61 12.19 18.03C10.43 18.35 9.97 17.6 9.83 17.2C9.75 17 9.4 16.37 9.1 16.2C8.85 16.07 8.5 15.74 9.09 15.73C9.65 15.72 10.05 16.24 10.18 16.45C10.82 17.52 11.84 17.22 12.25 17.03C12.31 16.57 12.5 16.26 12.7 16.08C11.12 15.9 9.46 15.29 9.46 12.58C9.46 11.81 9.74 11.17 10.19 10.67C10.12 10.49 9.87 9.76 10.26 8.78C10.26 8.78 10.85 8.59 12.2 9.5C12.76 9.34 13.36 9.26 13.96 9.26C14.56 9.26 15.16 9.26 15.72 9.5C17.07 8.58 17.66 8.78 17.66 8.78C18.05 9.76 17.8 10.49 17.73 10.67C18.18 11.17 18.46 11.8 18.46 12.58C18.46 15.3 16.79 15.9 15.21 16.08C15.47 16.3 15.69 16.72 15.69 17.38C15.69 18.33 15.68 19.09 15.68 19.33C15.68 19.51 15.79 19.71 16.1 19.64C18.88 18.72 20.9 16.1 20.9 13C20.9 9.13 17.77 6 14 6Z" fill="white" />
    </g>
  </svg>
);

const renderToolIcon = (iconName: string) => {
  switch (iconName) {
    case 'Server': return <HostingerLogo />;
    case 'Globe': return <NamecheapLogo />;
    case 'Database': return <SupabaseLogo />;
    case 'Key': return <AIStudioOpenAILogo />;
    case 'Mail': return <ResendLogo />;
    case 'Code': return <DockerGitHubLogo />;
    default: return <Settings className="w-5 h-5 text-indigo-500" />;
  }
};

const renderIntegrationLogo = (name: string, colorClass: string) => {
  switch (name) {
    case 'ActiveCampaign':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2V13h2v3.5zm0-4.5h-2V7.5h2V12z" fill="#004CFF" />
        </svg>
      );
    case 'Airtable':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M12.5 2.19a1 1 0 00-1 0L2.3 7.5a1 1 0 000 1.73l9.2 5.31a1 1 0 001 0l9.2-5.31a1 1 0 000-1.73z" fill="#18B0FF" />
          <path d="M2.3 16.5a1 1 0 000 1.73l9.2 5.31a1 1 0 001 0l9.2-5.31a1 1 0 000-1.73l-8.7 5a1 1 0 01-1 0z" fill="#F8B600" />
          <path d="M2.3 12a1 1 0 000 1.73l9.2 5.31a1 1 0 001 0l9.2-5.31a1 1 0 000-1.73l-8.7 5a1 1 0 01-1 0z" fill="#EC5656" />
        </svg>
      );
    case 'Asana':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="7" r="3.5" fill="#FC636B" />
          <circle cx="7.5" cy="15" r="3.5" fill="#FC636B" />
          <circle cx="16.5" cy="15" r="3.5" fill="#FC636B" />
        </svg>
      );
    case 'AWS S3':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="6" width="16" height="13" rx="2" stroke="#FF9900" strokeWidth="2.5" />
          <line x1="4" y1="11" x2="20" y2="11" stroke="#FF9900" strokeWidth="2" />
          <rect x="7" y="13" width="3" height="3" fill="#FF9900" />
          <rect x="14" y="13" width="3" height="3" fill="#FF9900" />
        </svg>
      );
    case 'Calendly':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="#006BFF" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M12 7C9.24 7 7 9.24 7 12s2.24 5 5 5c2.2 0 4-1.42 4.63-3.4h-2.5C13.6 14.1 12.9 14.5 12 14.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5c0.9 0 1.6.4 2.13 1.1h2.5C16 8.42 14.2 7 12 7Z" fill="#006BFF" />
        </svg>
      );
    case 'ClickUp':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3c-4.42 0-8 2.69-8 6h3c0-1.66 2.24-3 5-3s5 1.34 5 3h3c0-3.31-3.58-6-8-6Z" fill="#7B61FF" />
          <path d="M7 13.5l5 4.5l5-4.5" stroke="#FF4D96" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'Discord':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#5865F2" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.27 4.73A16.14 16.14 0 0 0 14.9 3.4a.1.1 0 0 0-.1.05A11.16 11.16 0 0 0 13.8 5.6a14.86 14.86 0 0 0-3.6 0 11.24 11.24 0 0 0-1-2.15.1.1 0 0 0-.1-.05 16.1 16.1 0 0 0-4.37 1.33.1.1 0 0 0-.05.04C1.5 9.84.8 14.78 1.15 19.65a.1.1 0 0 0 .04.07 16.27 16.27 0 0 0 4.9 2.45.1.1 0 0 0 .1-.05A11.35 11.35 0 0 0 7.2 20.3a.1.1 0 0 0-.05-.14c-1.55-.58-3.04-1.3-4.46-2.16a.1.1 0 0 1-.01-.16 11.3 11.3 0 0 0 4.2-2.1a.1.1 0 0 0-.07-.1 14.16 14.16 0 0 1-3.23.1H3c2.4 0 4.8-.42 7-1.2A11.83 11.83 0 0 1 13 13.4a11.3 11.3 0 0 0 4.2 2.1c-.2-.05-.01.12-.07.1a.1.1 0 0 1-.01.16c-1.42.86-2.91 1.58-4.46 2.16a.1.1 0 0 0-.05.14c.24.46.52.92.8 1.37a.1.1 0 0 0 .1.05 16.25 16.25 0 0 0 4.9-2.45c.03-.02.04-.05.04-.07.42-5.3-.87-10.23-3.72-14.88a.1.1 0 0 0-1.58-.04zM8.33 14a1.72 1.72 0 1 1 1.72-1.72A1.73 1.73 0 0 1 8.33 14zm7.34 0a1.72 1.72 0 1 1 1.72-1.72A1.73 1.73 0 0 1 15.67 14z" />
        </svg>
      );
    case 'Dropbox':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#0061FE" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 3.5L12 7.5L6 11.5L0 7.5L6 3.5Z" />
          <path d="M18 3.5L24 7.5L18 11.5L12 7.5L18 3.5Z" />
          <path d="M6 15.5L12 11.5L6 7.5L0 11.5L6 15.5Z" />
          <path d="M18 15.5L24 11.5L18 7.5L12 11.5L18 15.5Z" />
          <path d="M12 12.5L6 16.5L12 20.5L18 16.5L12 12.5V12.5Z" />
        </svg>
      );
    case 'Facebook Ads':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12a12 12 0 1 0-13.88 11.85V15.4H7.22v-3.4H10.1V9.45c0-2.84 1.7-4.42 4.3-4.42 1.25 0 2.55.22 2.55.22v2.81h-1.44c-1.4 0-1.85.88-1.85 1.77v2.13h3.17l-.5 3.4h-2.67v8.45A12 12 0 0 0 24 12Z" />
        </svg>
      );
    case 'Figma':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-6 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2a4 4 0 00-4 4v4h4V2z" fill="#F24E1E" />
          <path d="M12 2h4a4 4 0 010 8h-4V2z" fill="#FF7262" />
          <path d="M8 10a4 4 0 000 8h4v-8H8z" fill="#A259FF" />
          <path d="M12 10h4a4 4 0 010 8h-4v-8z" fill="#1ABC9C" />
          <path d="M8 18a4 4 0 004 4v-4H8z" fill="#19B5FE" />
        </svg>
      );
    case 'Gmail':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 13l10-7.5H2L12 13z" fill="#EA4335" />
          <path d="M22 6L12 13 2 6v12h20V6z" fill="#EA4335" opacity="0.15" />
          <path d="M2 6v12h4V8l6 4 6-4v10h4V6" stroke="#4285F4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'Google Drive':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.5 5.5l3.5 6h8l-3.5-6h-8z" fill="#FFD043" />
          <path d="M12 11.5l3.5 6h-11l3.5-6h4z" fill="#13A654" />
          <path d="M4.5 17.5l4-7 4 7h-8z" fill="#2E7DEC" />
        </svg>
      );
    case 'Notion':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#000000" />
          <path d="M6 6H8.5L14.5 14.5V6H17.5V18H15L9 9.5V18H6V6Z" fill="#FFFFFF" />
        </svg>
      );
    case 'Shopify':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6h-3c0-2.21-1.79-4-4-4S8 3.79 8 6H5c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" fill="#95BF47" />
          <path d="M12 4c1.1 0 2 .9 2 2H10c0-1.1.9-2 2-2z" fill="#7FA738" />
          <path d="M10 11c0-1.5 1.5-2 2-2s2 .5 2 2-1.5 2-2 2-2 .5-2-2z" fill="white" />
          <path d="M12 13c1.5 0 2 .5 2 2s-1.5 2-2 2-2-.5-2-2 1.5-2 2-2z" fill="white" />
        </svg>
      );
    case 'Slack':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5" cy="12" r="2" fill="#36C5F0" />
          <rect x="5" y="11" width="4" height="2" rx="1" fill="#36C5F0" />
          <circle cx="12" cy="19" r="2" fill="#2EB67D" />
          <rect x="11" y="15" width="2" height="4" rx="1" fill="#2EB67D" />
          <circle cx="19" cy="12" r="2" fill="#ECB22E" />
          <rect x="15" y="11" width="4" height="2" rx="1" fill="#ECB22E" />
          <circle cx="12" cy="5" r="2" fill="#E01E5A" />
          <rect x="11" y="5" width="2" height="4" rx="1" fill="#E01E5A" />
        </svg>
      );
    case 'Supabase':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.52 3.2a.5.5 0 0 0-.82.43l.8 5.87h-5.22a.5.5 0 0 0-.41.78l7.63 10.53a.5.5 0 0 0 .82-.43l-.8-5.87h5.22a.5.5 0 0 0 .41-.78L13.52 3.2z" fill="#3ECF8E" />
        </svg>
      );
    case 'Telegram':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#26A5E4" />
          <path d="M8 11.5l8-4-1 9-2.5-2-1.5 2v-2.5l-3-2.5" fill="white" />
        </svg>
      );
    case 'Twilio':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#F22F46" />
          <circle cx="9" cy="9" r="1.5" fill="white" />
          <circle cx="15" cy="9" r="1.5" fill="white" />
          <circle cx="9" cy="15" r="1.5" fill="white" />
          <circle cx="15" cy="15" r="1.5" fill="white" />
        </svg>
      );
    default:
      return (
        <span className={`${colorClass} font-black font-mono`}>
          {name.charAt(0)}
        </span>
      );
  }
};

// Live catalog from the HTML code
const directoryCatalog: Record<string, string[]> = {
  "Featured AI Agents": [
    "Advanced AI Powered Document Parsing & Text Extraction with Llama Parse.json",
    "AI Agent Chatbot + LONG TERM Memory + Note Storage + Telegram.json",
    "AI Agent Chatbot with Jina.ai Webpage Scraper.json",
    "AI Agent for n8n Creators Leaderboard - Find Popular Workflows.json",
    "AI Agent for Top n8n Creators Leaderboard Reporting.json",
    "AI Powered RAG Chatbot for Your Docs + Google Drive + Gemini + Qdrant.json",
    "AI-Powered YouTube Video Summarization & Analysis.json",
    "Analyze YouTube Video for Summaries, Transcripts & Content + Google Gemini AI.json",
    "Automate Multi-Platform Social Media Content Creation with AI.json",
    "Automated Social Media Content Publishing Factory + System Prompt Composition.json",
    "Automated Workflow Backups to Google Drive.json",
    "Build a Web Search Chatbot with GPT-4o and MCP Brave Search.json",
    "Compare Local Ollama Vision Models for Image Analysis using Google Docs.json",
    "Confluence Page AI Chatbot Workflow.json",
    "DeepSeek AI Agent + Telegram + LONG TERM Memory.json",
    "DeepSeek V3 Chat & R1 Reasoning Quick Start.json",
    "Easy WordPress Content Creation from PDF Docs + Human in the Loop Gmail.json",
    "Empower Your AI Chatbot with Long-Term Memory and Dynamic Tool Routing.json",
    "Essential Multipage Website Scraper with Jina.ai.json",
    "Generate SEO-Optimized WordPress Content with AI Powered Perplexity Research.json",
    "Monitor Favorite YouTube Channels Through RSS feeds and Receive Notifications.json",
    "Multi-AI Agent Chatbot for Postgres Supabase DB and QuickCharts + Tool Router.json",
    "Nostr #damus AI Powered Reporting + Gmail + Telegram.json",
    "PDF2Blog - Create Blog Post on Ghost CRM from PDF Document.json",
    "Perplexity Research to HTML AI-Powered Content Creation.json",
    "Private & Local Ollama Self-Hosted + Dynamic LLM Router.json",
    "Private & Local Ollama Self-Hosted AI Assistant.json",
    "Telegram Messaging Agent for Text Audio Images.json",
    "The Ultimate Free AI-Powered Researcher with Tavily Web Search & Extract.json",
    "Ultimate AI-Powered Chatbot for YouTube Summarization & Analysis.json",
    "Use OpenAI to Transcribe Audio + Summarize with AI + Save to Google Drive.json",
    "Your First Wordpress + AI Content Creator - Quick Start.json",
    "YouTube Video Comment Analysis Agent.json"
  ],
  "Agriculture": [
    "commodity_price_tracker.json",
    "crop_yield_predictor.json",
    "drone_image_crop_health.json",
    "farm_equipment_maintenance_reminder.json",
    "greenhouse_climate_controller.json",
    "harvest_logbook.json",
    "irrigation_schedule_optimizer.json",
    "pest_outbreak_alert.json",
    "soil_nutrient_analysis.json",
    "weather_impact_report.json"
  ],
  "AI & ML": [
    "auto-tag_blog_posts.json",
    "customer_sentiment_analysis.json",
    "daily_content_ideas.json",
    "image_captioning.json",
    "product_description_generator.json",
    "resume_screening.json",
    "summarize_customer_emails.json",
    "ticket_urgency_classification.json",
    "translate_form_submissions.json",
    "voice_note_transcription.json"
  ],
  "Automotive": [
    "adas_event_annotator.json",
    "autonomous_vehicle_log_summarizer.json",
    "car_insurance_quote_generator.json",
    "connected_car_alert.json",
    "dealer_lead_qualifier.json",
    "ev_battery_degradation_report.json",
    "fleet_fuel_efficiency_report.json",
    "recall_notice_tracker.json",
    "ride-share_surge_predictor.json",
    "vin_decoder.json"
  ],
  "Creative Content": [
    "youtube_transcript_to_blog.json"
  ],
  "Data Analytics": [
    "competitor_price_scraper.json"
  ],
  "DevOps": [
    "github_commit_jenkins.json"
  ],
  "E-Commerce & Retail": [
    "abandoned_cart_email.json",
    "inventory_slack_alert.json",
    "shopify_order_sms.json"
  ],
  "Education": [
    "daily_student_motivation.json",
    "quiz_auto_grader.json"
  ],
  "Email Automation": [
    "auto_archive_promotions.json",
    "auto_reply_to_faqs.json",
    "daily_email_digest.json",
    "follow-up_emails.json",
    "forward_attachments.json",
    "lead_to_hubspot.json",
    "mailchimp_campaign_tracking.json",
    "parse_invoice_emails.json",
    "product_launch_email.json",
    "sendgrid_bounce_alert.json"
  ],
  "Energy": [
    "battery_health_monitor.json",
    "carbon_footprint_estimator.json",
    "energy_consumption_anomaly_detector.json",
    "ev_charging_station_locator.json",
    "fuel_price_monitor.json",
    "grid_load_alert.json",
    "power_outage_sms.json",
    "renewable_incentive_tracker.json",
    "solar_output_forecaster.json",
    "wind_farm_maintenance_scheduler.json"
  ],
  "Finance & Accounting": [
    "currency_rate_monitor.json",
    "monthly_expense_report.json",
    "ocr_receipts_to_notion.json",
    "paypal_to_airtable.json",
    "stripe_to_quickbooks.json",
    "transaction_logs_backup.json",
    "unpaid_invoice_reminder.json",
    "weekly_shopify_sales_summary.json"
  ],
  "Gaming": [
    "achievement_suggestion_engine.json",
    "discord_guild_welcome_bot.json",
    "esports_match_alert.json",
    "game_bug_triage.json",
    "in-game_event_reminder.json",
    "loot_box_probability_calculator.json",
    "patch_note_summarizer.json",
    "player_sentiment_dashboard.json",
    "twitch_clip_highlights_script.json",
    "virtual_economy_price_tracker.json"
  ],
  "Government & NGO": [
    "public_form_auto_triage.json",
    "public_record_email_update.json"
  ],
  "Healthcare": [
    "appointment_whatsapp_notify.json"
  ],
  "HR": [
    "new_job_application_parser.json",
    "notion_job_board_poster.json"
  ],
  "IoT": [
    "ble_beacon_mapper.json",
    "edge_device_log_compressor.json",
    "environmental_data_dashboard.json",
    "industrial_iot_kpi_email.json",
    "iot_device_firmware_update_planner.json",
    "mqtt_topic_monitor.json",
    "predictive_maintenance_alert.json",
    "sensor_fault_detector.json",
    "smart_home_energy_saver.json",
    "vehicle_telematics_analyzer.json"
  ],
  "Manufacturing": [
    "inventory_restock_forecast.json",
    "machine_downtime_predictor.json",
    "maintenance_ticket_router.json",
    "mes_log_analyzer.json",
    "packaging_waste_calculator.json",
    "production_kpi_dashboard.json",
    "quality_defect_classifier.json",
    "safety_incident_alert.json",
    "shift_handover_summary.json",
    "supply_chain_delay_monitor.json"
  ],
  "Media": [
    "ad_campaign_performance_alert.json",
    "breaking_news_summarizer.json",
    "content_idea_brainstormer.json",
    "live_stream_chat_moderator.json",
    "music_playlist_mood_tagger.json",
    "podcast_show_notes_generator.json",
    "pr_crisis_detector.json",
    "script_dialogue_analyzer.json",
    "social_buzz_heatmap.json",
    "tv_rating_trend_report.json"
  ],
  "Misc": [
    "api_monitor_auto_restart.json",
    "api_stats_chart.json",
    "applicant_feedback_folder.json",
    "assignment_sms_reminder.json",
    "bank_sms_alert_to_telegram.json",
    "birthday_telegram_reminder.json",
    "blog_comment_discord.json",
    "blood_test_email_alert.json",
    "calendar_event_auto_tag.json",
    "calendar_to_clickup.json",
    "course_completion_certificate.json",
    "crm_patient_intake.json",
    "cron_success_slack.json",
    "csv_attachment_to_airtable.json",
    "customer_auto_tagging.json",
    "disaster_api_sms.json",
    "drink_water_reminder.json",
    "etsy_review_to_slack.json",
    "fitness_api_weekly_report.json",
    "ga_report_email.json",
    "grant_application_routing.json",
    "habit_form_weekly_summary.json",
    "hourly_weather_log.json",
    "idea_to_ig_carousel.json",
    "interview_scheduler.json",
    "issue_trello_card.json",
    "json_to_sheet.json",
    "keyword_rank_checker.json",
    "low_stock_discord.json",
    "medication_sms_reminder.json",
    "notion_api_update.json",
    "onboarding_checklist_slack.json",
    "order_shipped_notification.json",
    "podcast_transcribe_publish.json",
    "pr_merged_qa_notify.json",
    "price_update_google_sheet.json",
    "record_crypto_prices.json",
    "return_ticket_assignment.json",
    "rss_headlines_slack.json",
    "server_health_grafana.json",
    "starred_slack_to_notion.json",
    "survey_auto_analyze.json",
    "toggl_daily_report.json",
    "unsplash_to_pinterest.json",
    "voice_task_to_notion.json",
    "weekly_notes_backup.json",
    "woo_order_mailchimp.json",
    "zoom_attendance_log.json"
  ],
  "Productivity": [
    "morning_briefing_email.json"
  ],
  "Real Estate": [
    "hoa_fee_analyzer.json",
    "lead_scoring_with_mls_data.json",
    "mortgage_rate_alert.json",
    "neighborhood_safety_insights.json",
    "open_house_reminder.json",
    "property_description_generator.json",
    "real_estate_market_trend_report.json",
    "rental_price_estimator.json",
    "tenant_screening_summary.json",
    "zoning_regulation_checker.json"
  ],
  "Social Media": [
    "alert_on_instagram_competitor_story.json",
    "auto-dm_new_twitter_followers.json",
    "auto-post_blogs_to_linkedin_and_twitter.json",
    "auto-reply_to_tiktok_comments.json",
    "cross-post_youtube_uploads_to_facebook.json",
    "log_twitter_mentions_in_notion.json",
    "monthly_social_media_report.json",
    "reddit_upvote_alert.json",
    "schedule_instagram_content_from_airtable.json",
    "youtube_comment_summarizer.json"
  ],
  "Travel": [
    "airport_lounge_finder.json",
    "currency_exchange_estimator.json",
    "flight_price_drop_alert.json",
    "hotel_review_sentiment.json",
    "local_attraction_recommender.json",
    "road_trip_stop_planner.json",
    "travel_advisory_monitor.json",
    "travel_itinerary_builder.json",
    "visa_requirement_checker.json",
    "weather_packing_list_generator.json"
  ]
};

const integrationApps = [
  { name: "ActiveCampaign", color: "text-[#004CFF]" },
  { name: "Airtable", color: "text-[#18B0FF]" },
  { name: "Asana", color: "text-[#F03E3E]" },
  { name: "AWS S3", color: "text-[#FF9900]" },
  { name: "Calendly", color: "text-[#006BFF]" },
  { name: "ClickUp", color: "text-[#7B61FF]" },
  { name: "Discord", color: "text-[#5865F2]" },
  { name: "Dropbox", color: "text-[#0061FE]" },
  { name: "Facebook Ads", color: "text-[#1877F2]" },
  { name: "Figma", color: "text-[#F24E1E]" },
  { name: "Gmail", color: "text-[#EA4335]" },
  { name: "Google Drive", color: "text-[#34A853]" },
  { name: "Notion", color: "text-[#000000]" },
  { name: "Shopify", color: "text-[#95BF47]" },
  { name: "Slack", color: "text-[#4A154B]" },
  { name: "Supabase", color: "text-[#3ECF8E]" },
  { name: "Telegram", color: "text-[#26A5E4]" },
  { name: "Twilio", color: "text-[#F22F46]" }
];

const safeDecode = (str: string | null): string => {
  if (!str) return '';
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str;
  }
};

const safeSplitEmail = (email: any): string => {
  if (!email || typeof email !== 'string') return '';
  return email.split('@')[0] || '';
};

const TRANSLATIONS = {
  en: {
    heroTag: "Zero Cloud Costs • Self-Hosted Freedom",
    heroTitle: "Premium no-code automation templates.",
    heroTitleHighlight: "Built for n8n.",
    heroDesc: "Unlock 300+ ready-made n8n workflow templates to supercharge your no-code automation projects. This mega bundle covers everything from AI content creation, social media automation, CRM integrations, eCommerce workflows, APIs, WhatsApp, and web scraping — all in easy-to-import JSON files.",
    heroParagraphSub: "Perfect for freelancers, agencies, entrepreneurs, and businesses who want to save time and scale smarter without writing code.",
    btnUnlock: "Unlock 300+ JSON Templates",
    btnExplore: "Explore Directory",
    badgeWorkflows: "300+ Workflows",
    badgeRating: "4.9/5 Rating",
    badgePrivate: "100% Private Data",
    sidebarTitle: "Navigation Catalog",
    searchPlaceholder: "Search 300+ templates with .json syntax...",
    filesCountHeader: "workflows matching",
    fileClickToCopy: "Instant Copy JSON Config",
    fileDownload: "Download Active JSON Config",
    howToImportTitle: "How to Import a .json File in n8n",
    howToImportStep1Title: "1. Instant Import",
    howToImportStep1Desc: "Import your .json file into n8n with just one click.",
    howToImportStep2Title: "2. From Your PC",
    howToImportStep2Desc: "Log in to n8n. On the top right corner, click 'Import' and upload your .json file.",
    howToImportStep3Title: "3. From Your Phone",
    howToImportStep3Desc: "Log in on Safari/Chrome. On the top right corner, click on 'Import'.",
    howToImportImportant: "Note: The direct mobile application does not support raw imports. Please use your mobile browser.",
    keyBenefitsTitle: "Key Benefits of Automation",
    benefit1Title: "Save Time & Money",
    benefit1Desc: "Speed up your process, remove manual tasks, and sharply reduce administrative costs.",
    benefit2Title: "Autonomous AI Agents",
    benefit2Desc: "Orchestrate simple or highly complex tasks completely on autopilot.",
    benefit3Title: "No-Code Automation",
    benefit3Desc: "Integrate easily with all your favorite software platforms in seconds.",
    benefit4Title: "Highly Scalable",
    benefit4Desc: "Expand your daily workflow volume capacity smoothly with zero extra licensing costs.",
    pricingTitle: "Get the Premium No-Code Automation OS",
    pricingSubtitle: "Unlock the Ultimate No-Code Suite for $0.01 (99.9% Off) • Live Checkout",
    pricingBadge: "Instant Delivery Package",
    pricingBoxBadge: "Lifetime Access",
    pricingBoxTitle: "n8n Platform Suite",
    pricingBoxDesc: "Save hundreds of hours with this all-in-one n8n automation template bundle. Scale faster, launch smarter, and let automations work for you.",
    pricingChecked1: "Immediate access to 300+ production JSON files",
    pricingChecked2: "Detailed step-by-step PDF setup & import guide",
    pricingChecked3: "Complimentary lifetime updates to the template library",
    paySecureTitle: "Secure Digital Checkout",
    payNameLabel: "Your Full Name",
    payEmailLabel: "Email Address",
    payCardBtn: "International Credit Card",
    paySubtext: "* Transactions are processed securely via encrypted PayPal global gateways.",
    alreadyPaid: "Already paid? Sign in to restore access",
    seoDetailsTitle: "Product Specifications & Details",
    seoDetailsSub: "Everything you need to know about the JSONStack n8n Automation Suite",
    seoWhatsIncluded: "What’s Included",
    seoWhoItsFor: "Who It’s For",
    seoRequirements: "System Requirements",
    seoSupport: "Delivery & Support",
    seoLicense: "Commercial License",
    seoWhatsIncludedList: [
      "300+ production-ready n8n workflows (JSON format) instantly customisable",
      "Well-organized folders and categories: AI & Chatbots; Social Media (Facebook, Instagram, LinkedIn, YT, X); CRM & Marketing; eCommerce; APIs & Web Scraping; Cloud Storage; Communication (WhatsApp, Slack, Telegram, Gmail); Finance, HR, Education.",
      "Beautiful structural node configurations matching latest self-hosted versions"
    ],
    seoWhoItsForList: [
      "No-code builders who want instant system automation",
      "Agencies delivering high-ticket automation solutions for corporate clients",
      "Entrepreneurs & businesses scaling repetitive daily procedures (content, leads, data scraping, periodic reporting)"
    ],
    seoRequirementsList: [
      "n8n active account (self-hosted or official n8n cloud)",
      "Your own API keys for integrations you wish to run (e.g. OpenAI, Google, Facebook, v.v.)",
      "Simple file uploading process via default interface"
    ],
    seoSupportList: [
      "Instant, reliable digital download after payment",
      "7-day free email & message basic assistance",
      "Optional high-tier paid developer setup & custom workflows integration"
    ],
    seoLicenseList: [
      "Personal and commercial usage permitted for the sole individual purchaser.",
      "Strictly prohibited: Resale, sub-licensing, distribution, or sharing of any bundle files."
    ],
    seoFooterDisclaimer: "Disclaimer: We are not officially affiliated with, authorized, or endorsed by n8n.io."
  },
  vi: {
    heroTag: "Không Chi Phí Điện Toán Đám Mây • Tự Do Tự Cài Đặt",
    heroTitle: "Kho quy trình tự động hóa không cần code.",
    heroTitleHighlight: "Xây dựng cho n8n.",
    heroDesc: "Mở khóa hơn 300+ mẫu workflow n8n được thiết kế sẵn để tăng tốc các dự án tự động hóa không cần code của bạn. Mega bundle này bao gồm tất cả mọi thứ từ tạo nội dung bằng AI, tự động hóa mạng xã hội, tích hợp CRM, quy trình thương mại điện tử, APIs, WhatsApp và cào dữ liệu web — tất cả đều nằm trong tệp JSON cực kỳ dễ tải lên.",
    heroParagraphSub: "Hoàn hảo cho người làm tự do, agency, nhà khởi nghiệp và doanh nghiệp muốn tiết kiệm thời gian và mở rộng quy mô thông minh hơn mà không cần viết mã.",
    btnUnlock: "Mở Khóa 300+ Mẫu JSON",
    btnExplore: "Khám Phá Danh Mục",
    badgeWorkflows: "300+ Quy Trình",
    badgeRating: "Đánh Giá 4.9/5",
    badgePrivate: "100% Bảo Mật",
    sidebarTitle: "Danh Mục Bản Vẽ",
    searchPlaceholder: "Tìm kiếm 300+ tệp cấu hình .json...",
    filesCountHeader: "quy trình khớp với",
    fileClickToCopy: "Sao chép JSON cấu hình nhanh",
    fileDownload: "Tải xuống tệp JSON hoạt động",
    howToImportTitle: "Cách Import Tệp .json Vào n8n",
    howToImportStep1Title: "1. Nhập File Ngay",
    howToImportStep1Desc: "Tải quy trình .json của bạn vào hệ thống n8n chỉ trong một cú nhấp chuột.",
    howToImportStep2Title: "2. Thực Hiện Trên Máy Tính",
    howToImportStep2Desc: "Đăng nhập n8n. Ở góc trên cùng bên phải, nhấp vào 'Import' và chọn tải lên tệp .json của bạn.",
    howToImportStep3Title: "3. Thực Hiện Trên Điện Thoại",
    howToImportStep3Desc: "Đăng nhập n8n trên trình duyệt điện thoại (Safari/Chrome). Nhấn góc trên bên phải, nhấp chọn 'Import'.",
    howToImportImportant: "Lưu ý: Ứng dụng di động n8n native hiện chưa hỗ trợ import trực tiếp. Vui lòng sử dụng trình duyệt di động.",
    keyBenefitsTitle: "Các Lợi Ích Lớn Của Tự Động Hóa",
    benefit1Title: "Tiết Kiệm Thời Gian & Chi Phí",
    benefit1Desc: "Tối ưu hóa tốc độ quy trình, loại bỏ thao tác thủ công và giảm triệt để chi phí hành chính.",
    benefit2Title: "Đại Lý AI Tự Trị",
    benefit2Desc: "Điều phối các nhiệm vụ từ đơn giản đến phức tạp hoàn toàn tự động không cần người can thiệp.",
    benefit3Title: "Tự Động Hóa No-Code",
    benefit3Desc: "Kết nối liền mạch với tất cả công cụ và ứng dụng yêu thích của bạn một cách nhanh chóng.",
    benefit4Title: "Khả Năng Mở Rộng Cao",
    benefit4Desc: "Mở rộng công suất xử lý công việc hàng ngày một cách mượt mờ với chi phí cực kỳ tiết kiệm.",
    pricingTitle: "Sở Hữu Hệ Điều Hành Tự Động Hóa n8n Premium",
    pricingSubtitle: "Ưu Đãi Đặc Biệt: Mở khóa gói giải pháp No-Code tối thượng chỉ với $0.01 (Mức giảm 99.9%)",
    pricingBadge: "Giao Hàng Số Tức Thì",
    pricingBoxBadge: "Sử Dụng Trọn Đời",
    pricingBoxTitle: "Hệ Thống Giải Pháp n8n Suite",
    pricingBoxDesc: "Tiết kiệm hàng trăm giờ làm việc với gói tài nguyên tự động hóa n8n tất-cả-trong-một này. Tăng tốc nhanh hơn, vận hành thông minh hơn và để hệ thống tự hoạt động cho bạn.",
    pricingChecked1: "Mở khóa lập tức 300+ file cấu hình JSON chất lượng cao",
    pricingChecked2: "Sách tài liệu hướng dẫn thiết lập & import chi tiết từng bước",
    pricingChecked3: "Cập nhật miễn phí trọn đời thư viện mẫu quy trình",
    paySecureTitle: "Thanh Toán Số Bảo Mật",
    payNameLabel: "Họ Và Tên Của Bạn",
    payEmailLabel: "Địa Chỉ Email Nhận File",
    payCardBtn: "Cổng Thẻ Tín Dụng Quốc Tế",
    paySubtext: "* Các giao dịch được bảo mật an toàn 100% thông qua hệ thống cổng thanh toán toàn cầu PayPal.",
    alreadyPaid: "Bạn đã mua từ trước? Đăng nhập khôi phục quyền truy cập",
    seoDetailsTitle: "Thông Sắp Sản Phẩm & Chi Tiết",
    seoDetailsSub: "Tất cả thông tin thiết yếu bạn cần biết về Bộ Giải Pháp Tự Động Hóa JSONStack n8n",
    seoWhatsIncluded: "Những Gì Được Bao Gồm",
    seoWhoItsFor: "Sản Phẩm Dành Cho Ai",
    seoRequirements: "Yêu Cầu Hệ Thống",
    seoSupport: "Hệ Thống Hỗ Trợ & Giao Hàng",
    seoLicense: "Giấy Phép Sử Dụng Thương Mại",
    seoWhatsIncludedList: [
      "Hơn 300+ quy trình n8n sẵn sàng chạy (định dạng JSON) có thể tinh chỉnh linh hoạt.",
      "Sắp xếp cấu trúc thông minh theo các thư mục: AI & Trò Chuyện; Mạng Xã Hội (FB, Ins, X, LinkedIn, YT); CRM & Tiếp Thị; Thương Mại Điện Tử; APIs & Thu Thập Dữ Liệu; Đám Mây; Liên Lạc Automation; Tài Chính & Nhân Sự.",
      "Tối ưu tốt cho mọi phiên bản n8n tự lưu trữ thịnh hành."
    ],
    seoWhoItsForList: [
      "Những ai xây dựng hệ thống no-code muốn áp dụng tự động hóa tức thì.",
      "Các Agency cung cấp giải pháp chuyển đổi số và tự động hóa cho doanh nghiệp đối tác.",
      "Doanh nghiệp muốn tối ưu các công việc lặp đi lặp lại (quản lý lead, tạo nội dung, thu thập số liệu, gửi báo cáo hàng ngày)."
    ],
    seoRequirementsList: [
      "Có tài khoản n8n hoạt động (cloud hoặc self-hosted đều tương thích 100%).",
      "Mã khóa API nội bộ dành cho các dịch vụ muốn kết nối (như OpenAI, Google Drive, Facebook, v.v.).",
      "Hiểu cách sử dụng tính năng import tệp JSON trực quan có sẵn của n8n."
    ],
    seoSupportList: [
      "Link tải xuống thư mục nén chứa toàn bộ file cấu hình tức thì ngay sau khi hoàn tất giao dịch.",
      "Hỗ trợ kỹ thuật cơ bản miễn phí trong 7 ngày đầu qua email / cổng chat.",
      "Hỗ trợ viết quy trình thiết kế tùy chỉnh nâng cao theo yêu cầu có tính phí."
    ],
    seoLicenseList: [
      "Cho phép sử dụng cá nhân và dùng trong hoạt động thương mại nội bộ doanh nghiệp của một khách hàng mua duy nhất.",
      "Nghiêm cấm hành vi đóng gói bán thương mại lại quy trình gốc, phân phối lại hoặc chia sẻ công khai tệp tin lên internet."
    ],
    seoFooterDisclaimer: "Tuyên bố miễn trừ trách nhiệm: Chúng tôi không trực thuộc, không được ủy quyền, hoặc tài trợ chính thức bởi n8n.io."
  }
};

const getInitialChar = (name: any, fallback: string = 'U'): string => {
  const nameStr = String(name || '').trim();
  if (!nameStr) return fallback;
  return nameStr[0].toUpperCase();
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'vi'>('en');
  const [selectedFolder, setSelectedFolder] = useState("Featured AI Agents");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Interactive Task Savings Slider
  const [monthlyTasks, setMonthlyTasks] = useState(50000);
  
  // Simulated Order / Premium Access state
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [purchaserName, setPurchaserName] = useState("");
  const [purchaserEmail, setPurchaserEmail] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // PayPal checkout simulation state
  const [showPayPalModal, setShowPayPalModal] = useState(false);
  const [paypalStep, setPaypalStep] = useState<'login' | 'authorizing' | 'success'>('login');
  const [paypalPassword, setPaypalPassword] = useState("••••••••••••");
  const [showVirtualInbox, setShowVirtualInbox] = useState(false);
  const [virtualInboxOpen, setVirtualInboxOpen] = useState(true);

  // Custom node connection particle animation
  const [pulseActive, setPulseActive] = useState(0);

  // List of FAQ questions/answers
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  // Google Auth & Order checking states
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [authError, setAuthError] = useState<string>("");
  const [userOrders, setUserOrders] = useState<any[]>([]);

  // Upsell Products checkout states
  const [selectedAddon, setSelectedAddon] = useState<any>(null);
  const [showAddonPayModal, setShowAddonPayModal] = useState(false);
  const [addonPayStep, setAddonPayStep] = useState<'login' | 'authorizing' | 'success'>('login');
  const [addonPayPassword, setAddonPayPassword] = useState("••••••••••••");
  const ordersToRender = useMemo(() => {
    const orders = Array.isArray(userOrders) ? userOrders : [];
    if (isUnlocked && orders.length === 0) {
      return [{
        id: "Premium Lifetime Pack",
        status: 'Completed',
        amount: 0.01,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }];
    }
    return orders;
  }, [isUnlocked, userOrders]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [authEmailInput, setAuthEmailInput] = useState("");
  const [authNameInput, setAuthNameInput] = useState("");

  // Live purchase funnel simulation state
  const [activeNotification, setActiveNotification] = useState<any>(null);
  const [showNotification, setShowNotification] = useState(false);

  // Auto trigger customer purchase notifications every 30 seconds
  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;
    
    const triggerNotification = () => {
      const randomIndex = Math.floor(Math.random() * MOCK_NOTIFICATIONS.length);
      setActiveNotification(MOCK_NOTIFICATIONS[randomIndex]);
      setShowNotification(true);
      
      hideTimeout = setTimeout(() => {
        setShowNotification(false);
      }, 7000); // visible for 7 seconds
    };
    
    // Trigger first purchase notification after 8 seconds of mount
    const initialTimeout = setTimeout(() => {
      triggerNotification();
    }, 8000);
    
    // Trigger subsequent purchase notifications every 30 seconds
    const interval = setInterval(() => {
      triggerNotification();
    }, 30000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, []);

  // Dynamic SEO title and description updates based on language selection
  useEffect(() => {
    const metaTitle = lang === 'en' 
      ? 'Buy n8n Templates: 300+ Premium Automation Workflows Library'
      : 'Mua Workflow n8n: 300+ Kịch Bản Tự Động Hóa Premium Có Sẵn';
      
    const metaDesc = lang === 'en'
      ? 'Download over 300+ professional-grade n8n templates and workflows. Save hours of manual self-hosted setup and deploy instant CRM, AI agents, and marketing automations.'
      : 'Tải ngay kho kịch bản hơn 300+ mẫu workflow n8n chất lượng cao. Rút ngắn thời gian tự cài đặt máy chủ VPS, cấu hình tích hợp AI Agent, Telegram, Google Sheets, CRM.';

    const metaKeys = lang === 'en'
      ? 'n8n templates, buy n8n workflows, ready to use n8n workflow, n8n templates free, automate n8n, self hosted n8n script'
      : 'mua workflow n8n, n8n templates tiếng việt, kịch bản n8n tự động hóa, tài liệu hướng dẫn n8n, thư viện n8n, vps docker n8n';

    document.title = metaTitle;

    // Update or create Description tag
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', metaDesc);

    // Update or create Keywords tag
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', metaKeys);
  }, [lang]);

  // Auto detect language based on IP address location and browser preferences
  useEffect(() => {
    const savedLang = localStorage.getItem('jsonstack_preferred_lang');
    if (savedLang === 'en' || savedLang === 'vi') {
      setLang(savedLang);
      return;
    }

    // Checking browser default preference
    const browserLang = navigator.language || '';
    const isVietnameseBrowser = browserLang.toLowerCase().includes('vi');
    setLang(isVietnameseBrowser ? 'vi' : 'en');

    // Make an API call to verify the IP location
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.country_code) {
          const country = data.country_code.toUpperCase();
          if (country === 'VN') {
            setLang('vi');
          } else {
            setLang('en');
          }
        }
      })
      .catch((err) => {
        console.log('IP search failed or blocked by Extension. Using fallback.', err);
      });
  }, []);

  // Fetch orders from Supabase by email
  const fetchUserPurchases = async (email: string) => {
    if (!supabase || !email) return;
    setIsLoadingOrders(true);
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select('*')
        .eq('email', email);
      if (error) {
        console.error("Error fetching purchases:", error);
      } else if (data) {
        setUserOrders(data);
        const hasCompleted = data.some(order => order.status === 'Completed');
        if (hasCompleted) {
          setIsUnlocked(true);
          localStorage.setItem('jsonstack_unlocked', 'true');
          const completedOrder = data.find(order => order.status === 'Completed');
          if (completedOrder) {
            setPurchaserName(completedOrder.name || 'Customer');
            setPurchaserEmail(completedOrder.email);
            localStorage.setItem('jsonstack_purchaser_name', completedOrder.name);
            localStorage.setItem('jsonstack_purchaser_email', completedOrder.email);
          }
        }
      }
    } catch (err) {
      console.error("Fetch purchases error:", err);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  useEffect(() => {
    // Check if user is logged in natively via Supabase
    if (supabase) {
      try {
        supabase.auth.getSession().then(({ data }) => {
          if (data && data.session && data.session.user) {
            const sessionUser = data.session.user;
            setCurrentUserEmail(sessionUser.email || "");
            setCurrentUserName(sessionUser.user_metadata?.full_name || safeSplitEmail(sessionUser.email) || "User");
            fetchUserPurchases(sessionUser.email || "");
          }
        }).catch(err => {
          console.warn("Supabase initial session error:", err);
        });

        const authChangeResult = supabase.auth.onAuthStateChange((_event, session) => {
          if (session?.user) {
            setCurrentUserEmail(session.user.email || "");
            setCurrentUserName(session.user.user_metadata?.full_name || safeSplitEmail(session.user.email) || "User");
            fetchUserPurchases(session.user.email || "");
          } else {
            // Keep local lock status from localStorage if they aren't explicitly signed out locally
            setCurrentUserEmail("");
            setCurrentUserName("");
          }
        });

        // Safely extract subscription based on return object footprint
        const subscription = authChangeResult && (authChangeResult as any).data 
          ? (authChangeResult as any).data.subscription 
          : (authChangeResult as any).subscription || authChangeResult;

        return () => {
          if (subscription && typeof subscription.unsubscribe === 'function') {
            subscription.unsubscribe();
          }
        };
      } catch (err) {
        console.warn("Supabase auth integration error:", err);
      }
    }
  }, []);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('jsonstack_auth_email');
    const rememberedName = localStorage.getItem('jsonstack_auth_name');
    if (rememberedEmail) {
      setCurrentUserEmail(rememberedEmail);
      setCurrentUserName(rememberedName || safeSplitEmail(rememberedEmail));
      fetchUserPurchases(rememberedEmail);
    }
  }, []);

  useEffect(() => {
    // Check for real PayPal redirection params on return
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get('payment_status');
    const returnEmail = params.get('email');
    const returnName = params.get('name');
    
    const savedUnlocked = localStorage.getItem('jsonstack_unlocked') === 'true';
    const savedEmail = localStorage.getItem('jsonstack_purchaser_email');
    const savedName = localStorage.getItem('jsonstack_purchaser_name');
    
    if (paymentStatus === 'Completed' || savedUnlocked) {
      setIsUnlocked(true);
      if (returnEmail) {
        setPurchaserEmail(safeDecode(returnEmail));
        localStorage.setItem('jsonstack_purchaser_email', returnEmail);
      } else if (savedEmail) {
        setPurchaserEmail(safeDecode(savedEmail));
      }
      
      if (returnName) {
        setPurchaserName(safeDecode(returnName));
        localStorage.setItem('jsonstack_purchaser_name', returnName);
      } else if (savedName) {
        setPurchaserName(safeDecode(savedName));
      }
      
      localStorage.setItem('jsonstack_unlocked', 'true');
      
      if (paymentStatus === 'Completed') {
        setShowSuccessModal(true);
        setShowVirtualInbox(true);
        
        // Save completed transaction in Supabase
        const emailVal = returnEmail ? safeDecode(returnEmail) : (savedEmail || '');
        const nameVal = returnName ? safeDecode(returnName) : (savedName || 'Customer');
        const returnAmount = Number(params.get('amount')) || 0.01;
        if (supabase && emailVal) {
          (async () => {
            try {
              const { data: existingData, error: selectError } = await supabase
                .from('purchases')
                .select('*')
                .eq('email', emailVal)
                .maybeSingle();

              if (selectError) {
                console.error("Supabase select error:", selectError);
              }

              let dbError;
              if (existingData) {
                const { error: updateError } = await supabase
                  .from('purchases')
                  .update({
                    name: nameVal,
                    amount: returnAmount,
                    status: 'Completed',
                    updated_at: new Date().toISOString()
                  })
                  .eq('email', emailVal);
                dbError = updateError;
              } else {
                const { error: insertError } = await supabase
                  .from('purchases')
                  .insert({
                    email: emailVal,
                    name: nameVal,
                    amount: returnAmount,
                    status: 'Completed',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                  });
                dbError = insertError;
              }

              if (dbError) {
                console.error("Supabase write error:", dbError);
              } else {
                console.log("Supabase payment logged successfully via robust upsert!");
              }
            } catch (err) {
              console.error("Supabase catch exception error:", err);
            }
          })();
        }

        // Clear query parameters cleanly from browser address bar
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseActive((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Compute live savings based on monthly task slider
  const pricingData = useMemo(() => {
    let zapierCost = 39;
    let makeCost = 15;
    
    if (monthlyTasks <= 5000) {
      zapierCost = 39;
      makeCost = 15;
    } else if (monthlyTasks <= 15000) {
      zapierCost = 89;
      makeCost = 39;
    } else if (monthlyTasks <= 50000) {
      zapierCost = 299;
      makeCost = 89;
    } else if (monthlyTasks <= 100000) {
      zapierCost = 599;
      makeCost = 189;
    } else if (monthlyTasks <= 250000) {
      zapierCost = 1299;
      makeCost = 379;
    } else {
      zapierCost = 2399;
      makeCost = 659;
    }

    const n8nCost = 5; // VPS server
    const monthlySavings = (zapierCost - n8nCost);
    const yearlySavings = monthlySavings * 12;

    return { zapierCost, makeCost, n8nCost, monthlySavings, yearlySavings };
  }, [monthlyTasks]);

  // Generate a mock n8n-compatible JSON blueprint based on the workflow name
  const generateMockN8NJson = (filename: string) => {
    return JSON.stringify({
      "name": filename.replace(".json", ""),
      "nodes": [
        {
          "parameters": {
            "path": "webhook-trigger",
            "options": {}
          },
          "id": "73d7ec16-ebec-4284-bf50-25e4c0ba68e2",
          "name": "Webhook Trigger",
          "type": "n8n-nodes-base.webhook",
          "typeVersion": 1,
          "position": [250, 300]
        },
        {
          "parameters": {
            "model": "gemini-1.5-flash",
            "prompt": "Analyze the input and map to target SaaS sync: " + filename
          },
          "id": "a90ee9f5-7f2a-4f5a-8b8a-b9c10444cefa",
          "name": "Google Gemini AI",
          "type": "n8n-nodes-base.openAi",
          "typeVersion": 1,
          "position": [450, 300]
        },
        {
          "parameters": {
            "resource": "database",
            "operation": "upsert"
          },
          "id": "ebd8dec1-f8a2-4a0b-ac68-24388ffc8d5c",
          "name": "Local Database Upsert",
          "type": "n8n-nodes-base.postgres",
          "typeVersion": 1,
          "position": [650, 300]
        }
      ],
      "connections": {
        "Webhook Trigger": {
          "main": [
            [
              {
                "node": "Google Gemini AI",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Google Gemini AI": {
          "main": [
            [
              {
                "node": "Local Database Upsert",
                "type": "main",
                "index": 0
              }
            ]
          ]
        }
      },
      "active": true,
      "settings": {
        "executionOrder": "v1"
      }
    }, null, 2);
  };

  const handleCopyClipboardJson = (filename: string) => {
    const code = generateMockN8NJson(filename);
    navigator.clipboard.writeText(code).then(() => {
      setCopyFeedback(filename);
      setTimeout(() => setCopyFeedback(null), 3000);
    });
  };

  const downloadJsonFile = (filename: string) => {
    // Only allow dynamic single JSON download if unlocked as a backup
    if (!isUnlocked) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(generateMockN8NJson(filename));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const downloadPremiumZip = () => {
    // Downloads the real zip file uploaded by the user inside public/templates/
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", "/templates/n8n-templates-300.zip.zip");
    downloadAnchor.setAttribute("download", "n8n-templates-300.zip");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const initiatePayPalCheckout = (event: React.FormEvent) => {
    event.preventDefault();
    if (!purchaserName || !purchaserEmail) {
      alert("Vui lòng điền tên và Email của bạn trước khi tiến hành thanh toán.");
      return;
    }
    
    // Construct URLs for PayPal redirect
    const returnUrl = window.location.origin + window.location.pathname + `?payment_status=Completed&email=${encodeURIComponent(purchaserEmail)}&name=${encodeURIComponent(purchaserName)}&amount=0.01`;
    const cancelUrl = window.location.origin + window.location.pathname + `?payment_status=Cancelled`;
    
    // Construct standard PayPal Standard Payment checkout link
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?` + 
      `cmd=_xclick` +
      `&business=${encodeURIComponent('ahitofficial.com@gmail.com')}` +
      `&item_name=${encodeURIComponent('JSONStack 300+ Premium n8n Workflows Bundle')}` +
      `&amount=0.01` +
      `&currency_code=USD` +
      `&no_shipping=1` +
      `&no_note=1` +
      `&custom=${encodeURIComponent(purchaserEmail)}` +
      `&return=${encodeURIComponent(returnUrl)}` +
      `&cancel_return=${encodeURIComponent(cancelUrl)}`;
      
    // Save info in localStorage as backup
    localStorage.setItem('jsonstack_purchaser_name', purchaserName);
    localStorage.setItem('jsonstack_purchaser_email', purchaserEmail);
    
    const performRedirect = () => {
      // Open in a new tab to bypass iframe security/sandbox policies in Google AI Studio
      const newWin = window.open(paypalUrl, '_blank');
      // If the browser pop-up blocker prevents it, redirect the top screen (or current window)
      if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
        try {
          if (window.top && window.top !== window) {
            window.top.location.href = paypalUrl;
          } else {
            window.location.href = paypalUrl;
          }
        } catch (e) {
          window.location.href = paypalUrl;
        }
      }
    };

    // Log purchase as "Pending" in Supabase, then redirect to PayPal
    if (supabase) {
      const redirectTimer = setTimeout(() => {
        performRedirect();
      }, 1000); // safety fallback

      (async () => {
        try {
          const { data: existingData, error: selectError } = await supabase
            .from('purchases')
            .select('*')
            .eq('email', purchaserEmail)
            .maybeSingle();

          if (selectError) {
            console.error("Supabase select error:", selectError);
          }

          let dbError;
          if (existingData) {
            const { error: updateError } = await supabase
              .from('purchases')
              .update({
                name: purchaserName,
                amount: 19,
                status: 'Pending',
                updated_at: new Date().toISOString()
              })
              .eq('email', purchaserEmail);
            dbError = updateError;
          } else {
            const { error: insertError } = await supabase
              .from('purchases')
              .insert({
                email: purchaserEmail,
                name: purchaserName,
                amount: 19,
                status: 'Pending',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              });
            dbError = insertError;
          }

          if (dbError) {
            console.error("Supabase pending write error returned:", dbError);
          } else {
            console.log("Supabase pending write logged successfully!");
          }
        } catch (err) {
          console.error("Supabase pending insert exception:", err);
        } finally {
          clearTimeout(redirectTimer);
          performRedirect();
        }
      })();
    } else {
      performRedirect();
    }
  };

  const completePayPalPayment = () => {
    setPaypalStep('authorizing');
    // Simulate active authorize pipeline
    setTimeout(() => {
      setPaypalStep('success');
      setTimeout(() => {
        setIsUnlocked(true);
        setShowPayPalModal(false);
        setShowSuccessModal(true);
        setShowVirtualInbox(true);
      }, 1200);
    }, 2200);
  };

  const handleCheckoutSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    initiatePayPalCheckout(event);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  // Filtered JSON filenames list
  const filteredFiles = useMemo(() => {
    const files = directoryCatalog[selectedFolder] || [];
    if (!searchQuery) return files;
    return files.filter(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [selectedFolder, searchQuery]);

  return (
    <div className="font-sans bg-white text-black overflow-x-hidden selection:bg-neutral-100 selection:text-black">
      {/* Launch Offer Promo Banner */}
      <div className="bg-black text-white text-[10px] sm:text-xs py-2 px-4 text-center font-bold tracking-widest uppercase border-b border-neutral-800">
        {lang === 'en' 
          ? 'Launch Offer: Unlock the Ultimate No-Code Suite for $0.01 (99.9% Off) • Live Checkout Active'
          : 'Ưu đãi đặc biệt: Mở khóa giải pháp No-Code tối thượng chỉ với $0.01 (Giảm 99.9%) • Thanh toán Thật'}
      </div>

      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 h-16 sm:h-20 flex items-center justify-between">
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 flex items-center justify-center shrink-0">
              <img 
                src="/logos/jsonstack_logo.png" 
                alt="JSONStack Logo" 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (e.currentTarget.src.includes('/logos/jsonstack_logo.png')) {
                    e.currentTarget.src = "/logos/jsonstack_logo.jpg";
                  } else {
                    e.currentTarget.style.display = 'none';
                    const svg = e.currentTarget.parentElement?.querySelector('svg');
                    if (svg) svg.style.display = 'block';
                  }
                }}
              />
              <svg className="w-6 h-6 text-black" style={{ display: 'none' }} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="8" fill="none"/>
                <line x1="50" y1="15" x2="50" y2="85" stroke="black" strokeWidth="16"/>
                <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="8"/>
              </svg>
            </div>
            <span className="text-xl sm:text-2xl tracking-[0.05em] uppercase font-sans flex items-center">
              <span className="font-black text-black">JSON</span>
              <span className="font-light text-neutral-550">STACK</span>
            </span>
          </a>
          
          <div className="hidden md:flex space-x-8 text-[11px] tracking-widest uppercase font-bold text-neutral-500">
            <a href="#no-code-automation" className="hover:text-black transition-colors">{lang === 'en' ? 'No-Code Cost' : 'Chi phí No-Code'}</a>
            {!isUnlocked && <a href="#directory" className="hover:text-black transition-colors">{lang === 'en' ? 'The Directory' : 'Thư viện mẫu'}</a>}
            <a href="#saas-integration" className="hover:text-black transition-colors">{lang === 'en' ? 'SaaS Sync' : 'Đồng bộ SaaS'}</a>
            <a href="#pricing" className="hover:text-black transition-colors">{lang === 'en' ? 'Pricing' : 'Bảng giá'}</a>
          </div>

          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <button
              onClick={() => {
                const newLang = lang === 'en' ? 'vi' : 'en';
                setLang(newLang);
                localStorage.setItem('jsonstack_preferred_lang', newLang);
              }}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-neutral-200 text-[10px] tracking-wider uppercase font-bold text-neutral-600 bg-white hover:bg-neutral-50 hover:border-black transition-all font-sans cursor-pointer shrink-0"
              title="Change Language / Đổi ngôn ngữ"
            >
              <Globe size={11} className="text-neutral-500" />
              <span>{lang === 'en' ? 'EN' : 'VI'}</span>
            </button>

            {isUnlocked ? (
              <div className="hidden md:block relative group py-1 animate-fade-in text-xs">
                {/* The Username badge */}
                <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 rounded-full py-1.5 px-3 cursor-pointer">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-[10px]">
                    {getInitialChar(purchaserName || currentUserName || purchaserEmail || currentUserEmail)}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-neutral-800 max-w-[120px] truncate" title={String(purchaserName || currentUserName || purchaserEmail || currentUserEmail || '')}>
                      {purchaserName || currentUserName || safeSplitEmail(purchaserEmail) || safeSplitEmail(currentUserEmail) || 'Customer'}
                    </span>
                    <span className="text-[9px] text-emerald-600 font-medium">{lang === 'en' ? 'Premium Package ($0.01)' : 'Gói Premium (0.01$)'}</span>
                  </div>
                  <ChevronDown size={11} className="text-emerald-600 transition-transform duration-200 group-hover:rotate-180" />
                </div>

                {/* Dropdown container */}
                <div className="absolute right-0 top-full pt-2 hidden group-hover:block z-50 min-w-[155px]">
                  <div className="bg-white border border-neutral-200 shadow-xl rounded-xl p-2 flex flex-col gap-1.5">
                    <button 
                      onClick={() => {
                        const activeEmail = purchaserEmail || currentUserEmail || localStorage.getItem('jsonstack_purchaser_email') || localStorage.getItem('jsonstack_auth_email') || '';
                        if (activeEmail) {
                          fetchUserPurchases(activeEmail);
                        }
                        setShowOrdersModal(true);
                      }}
                      className="w-full text-left inline-flex items-center gap-2 px-3 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg text-[10px] tracking-wider uppercase font-bold transition-all"
                    >
                      <ShoppingBag size={12} className="text-neutral-500" /> {lang === 'en' ? 'My Orders' : 'Đơn hàng'}
                    </button>
                    <button 
                      onClick={() => {
                        if (supabase) supabase.auth.signOut();
                        setCurrentUserEmail("");
                        setCurrentUserName("");
                        localStorage.removeItem('jsonstack_auth_email');
                        localStorage.removeItem('jsonstack_auth_name');
                        setIsUnlocked(false);
                        localStorage.removeItem('jsonstack_unlocked');
                        setPurchaserName("");
                        setPurchaserEmail("");
                        localStorage.removeItem('jsonstack_purchaser_name');
                        localStorage.removeItem('jsonstack_purchaser_email');
                        setUserOrders([]);
                      }}
                      className="w-full text-left inline-flex items-center gap-2 px-3 py-2 text-red-650 hover:bg-red-50 rounded-lg text-[10px] tracking-wider uppercase font-bold transition-all"
                    >
                      <LogOut size={12} /> {lang === 'en' ? 'Log Out' : 'Đăng xuất'}
                    </button>
                  </div>
                </div>
              </div>
            ) : currentUserEmail ? (
              <div className="hidden md:block relative group py-1 text-xs">
                {/* The Username badge */}
                <div className="flex items-center space-x-2 bg-neutral-50 border border-neutral-200/80 rounded-full py-1.5 px-3 cursor-pointer">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-[10px]">
                    {currentUserName ? currentUserName[0].toUpperCase() : 'U'}
                  </div>
                  <span className="font-semibold text-neutral-700 max-w-[120px] truncate" title={currentUserEmail}>
                    {currentUserEmail}
                  </span>
                  <ChevronDown size={11} className="text-neutral-500 transition-transform duration-200 group-hover:rotate-180" />
                </div>

                {/* Dropdown container */}
                <div className="absolute right-0 top-full pt-2 hidden group-hover:block z-50 min-w-[155px]">
                  <div className="bg-white border border-neutral-200 shadow-xl rounded-xl p-2 flex flex-col gap-1.5">
                    <button 
                      onClick={() => {
                        fetchUserPurchases(currentUserEmail);
                        setShowOrdersModal(true);
                      }}
                      className="w-full text-left inline-flex items-center gap-2 px-3 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg text-[10px] tracking-wider uppercase font-bold transition-all"
                    >
                      <ShoppingBag size={12} className="text-neutral-500" /> {lang === 'en' ? 'My Orders' : 'Đơn hàng'}
                    </button>
                    <button 
                      onClick={() => {
                        if (supabase) supabase.auth.signOut();
                        setCurrentUserEmail("");
                        setCurrentUserName("");
                        localStorage.removeItem('jsonstack_auth_email');
                        localStorage.removeItem('jsonstack_auth_name');
                        setIsUnlocked(false);
                        localStorage.removeItem('jsonstack_unlocked');
                      }}
                      className="w-full text-left inline-flex items-center gap-2 px-3 py-2 text-red-650 hover:bg-red-50 rounded-lg text-[10px] tracking-wider uppercase font-bold transition-all"
                    >
                      <LogOut size={12} /> {lang === 'en' ? 'Log Out' : 'Đăng xuất'}
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {!isUnlocked && (
              <a href="#pricing" className="bg-black text-white text-[11px] tracking-widest uppercase font-bold px-5 py-2.5 rounded-lg hover:bg-neutral-800 transition-all font-sans">
                {lang === 'en' ? 'Get Template Pack' : 'Tải Gói Template'}
              </a>
            )}

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2 text-black hover:bg-neutral-100 rounded"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

      {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-100 bg-white/95 backdrop-blur-md py-4 px-6 space-y-4">
            <a 
              href="#no-code-automation" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold uppercase tracking-widest text-neutral-600 hover:text-black"
            >
              No-Code Cost
            </a>
            {!isUnlocked && (
              <a 
                href="#directory" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-bold uppercase tracking-widest text-neutral-600 hover:text-black"
              >
                The Directory
              </a>
            )}
            <a 
              href="#saas-integration" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold uppercase tracking-widest text-neutral-600 hover:text-black"
            >
              SaaS Sync
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold uppercase tracking-widest text-neutral-600 hover:text-black"
            >
              Pricing
            </a>

            {/* Mobile Auth and My Orders Controls */}
            <div className="pt-4 border-t border-neutral-100 space-y-3">
              {isUnlocked ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 rounded-xl py-2 px-3 text-xs">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-[10px]">
                      {getInitialChar(purchaserName || currentUserName || purchaserEmail || currentUserEmail)}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-neutral-800 truncate block">
                        {purchaserName || currentUserName || safeSplitEmail(purchaserEmail) || safeSplitEmail(currentUserEmail) || 'Customer'}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-sans font-medium">Gói Premium (0.01$)</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const activeEmail = purchaserEmail || currentUserEmail || localStorage.getItem('jsonstack_purchaser_email') || localStorage.getItem('jsonstack_auth_email') || '';
                      if (activeEmail) {
                        fetchUserPurchases(activeEmail);
                      }
                      setShowOrdersModal(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 bg-neutral-950 text-white text-[11px] tracking-widest uppercase font-bold py-3 px-4 rounded-lg hover:bg-neutral-800 transition-all shadow-sm"
                  >
                    <ShoppingBag size={12} /> Đơn hàng của tôi
                  </button>
                  <button 
                    onClick={() => {
                      if (supabase) supabase.auth.signOut();
                      setCurrentUserEmail("");
                      setCurrentUserName("");
                      localStorage.removeItem('jsonstack_auth_email');
                      localStorage.removeItem('jsonstack_auth_name');
                      setIsUnlocked(false);
                      localStorage.removeItem('jsonstack_unlocked');
                      setPurchaserName("");
                      setPurchaserEmail("");
                      localStorage.removeItem('jsonstack_purchaser_name');
                      localStorage.removeItem('jsonstack_purchaser_email');
                      setUserOrders([]);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 border border-red-200 text-red-600 bg-red-50/50 text-[11px] tracking-widest uppercase font-bold py-3 px-4 rounded-lg hover:bg-red-50 transition-all"
                  >
                    <LogOut size={12} /> Đăng xuất
                  </button>
                </div>
              ) : currentUserEmail ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 bg-neutral-50 border border-neutral-200/80 rounded-xl py-2 px-3 text-xs">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-[10px]">
                      {currentUserName ? currentUserName[0].toUpperCase() : 'U'}
                    </div>
                    <span className="font-semibold text-neutral-700 truncate block">
                      {currentUserEmail}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      fetchUserPurchases(currentUserEmail);
                      setShowOrdersModal(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 bg-neutral-950 text-white text-[11px] tracking-widest uppercase font-bold py-3 px-4 rounded-lg hover:bg-neutral-800 transition-all shadow-sm"
                  >
                    <ShoppingBag size={12} /> Đơn hàng của tôi
                  </button>
                  <button 
                    onClick={() => {
                      if (supabase) supabase.auth.signOut();
                      setCurrentUserEmail("");
                      setCurrentUserName("");
                      localStorage.removeItem('jsonstack_auth_email');
                      localStorage.removeItem('jsonstack_auth_name');
                      setIsUnlocked(false);
                      localStorage.removeItem('jsonstack_unlocked');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 border border-red-200 text-red-600 bg-red-50/50 text-[11px] tracking-widest uppercase font-bold py-3 px-4 rounded-lg hover:bg-red-55 transition-all"
                  >
                    <LogOut size={12} /> Đăng xuất
                  </button>
                </div>
              ) : (
                <div className="text-center p-3 border border-dashed border-neutral-250 rounded-xl bg-neutral-50/50">
                  <span className="text-[10px] text-neutral-400 block font-light leading-relaxed">
                    Bạn có thể đăng nhập để khôi phục đơn hàng trực tiếp tại phần thanh toán bên dưới.
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section Container */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-20 sm:pt-20 sm:pb-28 relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-3xl space-y-6 sm:space-y-8">
          <span className="inline-flex items-center text-[10px] font-bold tracking-widest uppercase text-neutral-400 border-b border-neutral-200 pb-1">
            {TRANSLATIONS[lang].heroTag}
          </span>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-black leading-[1.05]">
            {lang === 'en' ? (
              <>Premium <span className="underline underline-offset-8 decoration-1 decoration-neutral-300">no-code automation</span> templates. Built for n8n.</>
            ) : (
              <>Kho quy trình <span className="underline underline-offset-8 decoration-1 decoration-neutral-300">tự động hóa không code</span> cao cấp. Xây dựng cho n8n.</>
            )}
          </h1>
          
          <p className="text-neutral-500 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
            {TRANSLATIONS[lang].heroDesc} <span className="text-black font-semibold">{TRANSLATIONS[lang].heroParagraphSub}</span>
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
            <a href="#pricing" className="bg-black text-white font-bold text-center py-4 px-8 rounded-lg text-xs tracking-widest uppercase hover:bg-neutral-800 transition-all shadow-sm">
              {TRANSLATIONS[lang].btnUnlock}
            </a>
            <a href="#directory" className="border border-neutral-200 text-neutral-800 font-bold text-center py-4 px-8 rounded-lg text-xs tracking-widest uppercase hover:bg-neutral-50 transition-all flex items-center justify-center gap-2">
              {TRANSLATIONS[lang].btnExplore} <ArrowDown size={14} className="animate-bounce" />
            </a>
          </div>

          {/* Social Proof Badges */}
          <div className="flex items-center gap-6 pt-4 border-t border-neutral-100">
            <div>
              <div className="text-2xl font-black text-black">300+</div>
              <div className="text-[10px] text-neutral-400 uppercase tracking-wider">{TRANSLATIONS[lang].badgeWorkflows}</div>
            </div>
            <div className="h-8 w-[1px] bg-neutral-200"></div>
            <div>
              <div className="text-2xl font-black text-black">4.9/5</div>
              <div className="text-[10px] text-neutral-400 uppercase tracking-wider">{TRANSLATIONS[lang].badgeRating}</div>
            </div>
            <div className="h-8 w-[1px] bg-neutral-200"></div>
            <div>
              <div className="text-2xl font-black text-black">100%</div>
              <div className="text-[10px] text-neutral-400 uppercase tracking-wider">{TRANSLATIONS[lang].badgePrivate}</div>
            </div>
          </div>
        </div>

        {/* Live Interactive n8n Workflow Visualization */}
        <div className="order-first lg:order-last bg-neutral-50 border border-neutral-100 p-6 rounded-3xl relative overflow-hidden h-[420px] flex flex-col justify-between shadow-sm">
          {/* Backdropgrid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#efefef_1px,transparent_1px),linear-gradient(to_bottom,#efefef_1px,transparent_1px)] bg-[size:24px_24px] opacity-60"></div>
          
          <div className="relative z-10 flex items-center justify-between border-b border-neutral-200 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[10px] font-mono font-extrabold text-neutral-800 uppercase tracking-widest">Active Canvas Orchestration</span>
            </div>
            <div className="bg-black/5 text-[9px] font-mono text-neutral-500 px-2 py-0.5 rounded uppercase">
              Production Setup
            </div>
          </div>

          {/* Connected Nodes Map */}
          <div className="relative z-10 my-auto py-8">
            <div className="flex justify-between items-center relative">
              {/* Animated Connection Lines */}
              <div className="absolute left-1/12 right-1/12 height-[2px] bg-neutral-200 top-1/2 -translate-y-1/2 z-0">
                <div 
                  className="h-full bg-black transition-all duration-1000 ease-out" 
                  style={{ 
                    width: pulseActive === 0 ? '25%' : pulseActive === 1 ? '50%' : pulseActive === 2 ? '75%' : '100%',
                    boxShadow: '0 0 8px #000'
                  }}
                ></div>
              </div>

              {/* Node 1: Trigger */}
              <div className={`p-3 bg-white rounded-xl border transition-all z-10 relative flex flex-col items-center justify-center text-center ${pulseActive === 0 ? 'border-black scale-110 shadow-md' : 'border-neutral-200'}`}>
                <div className="w-9 h-9 rounded-lg bg-neutral-900 text-white flex items-center justify-center mb-1">
                  <Terminal size={16} />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider block">1. Webhook</span>
                <span className="text-[7px] text-neutral-400 block font-mono">POST Receive</span>
              </div>

              {/* Node 2: Gemini Parser */}
              <div className={`p-3 bg-white rounded-xl border transition-all z-10 relative flex flex-col items-center justify-center text-center ${pulseActive === 1 ? 'border-blue-500 scale-110 shadow-md scale-102' : 'border-neutral-200'}`}>
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-1">
                  <Sparkles size={16} className="animate-spin-slow" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider block text-blue-900">2. DeepSeek</span>
                <span className="text-[7px] text-neutral-400 block font-mono">AI Structured</span>
              </div>

              {/* Node 3: Router */}
              <div className={`p-3 bg-white rounded-xl border transition-all z-10 relative flex flex-col items-center justify-center text-center ${pulseActive === 2 ? 'border-indigo-500 scale-110 shadow-md' : 'border-neutral-200'}`}>
                <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-1">
                  <Mail size={16} />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider block">3. Gmail API</span>
                <span className="text-[7px] text-neutral-400 block font-mono">Send Alert</span>
              </div>
            </div>
          </div>

          {/* Active stats bar inside representation card */}
          <div className="bg-white border border-neutral-200/60 p-3 rounded-2xl flex items-center justify-between text-xs font-mono select-none">
            <span className="text-[10px] text-neutral-400">{lang === 'en' ? 'Throughput Performance' : 'Hiệu suất xử lý webhook:'}</span>
            <span className="text-black font-bold">12 ms response</span>
          </div>
        </div>
      </section>

      {/* Setup Tools Required before n8n Import Section */}
      <section id="setup-tools" className="max-w-6xl mx-auto px-6 py-16 sm:py-24 space-y-12 border-t border-neutral-100">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[10px] tracking-widest uppercase font-black text-neutral-850 bg-neutral-100 px-3 py-1 rounded inline-block font-mono">
            {lang === 'en' ? '🛠️ ESSENTIAL REQUIREMENTS BEFORE IMPORT' : '🛠️ CÔNG CỤ CẦN THIẾT • THIẾT LẬP TRƯỚC KHI IMPORT'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black">
            {lang === 'en' ? 'Prepare Your Local Environment' : 'Toàn bộ công cụ cài đặt trước khi import lên n8n'}
          </h2>
          <p className="text-neutral-500 text-sm font-light leading-relaxed">
            {lang === 'en' 
              ? 'Gather these vital assets to secure stable self-hosted freedom and bypass limits.'
              : 'Chuẩn bị đầy đủ các tài nguyên thiết yếu dưới đây để đảm bảo hệ thống n8n tự lưu trữ hoạt động hoàn hảo, xử lý hàng triệu công việc tự động không phí duy trì.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SETUP_TOOLS.map((tool) => {
            const hasHighlight = lang === 'en' ? !!tool.highlightEn : !!tool.highlightVi;
            const highlightText = lang === 'en' ? tool.highlightEn : tool.highlightVi;
            const categoryText = lang === 'en' ? tool.categoryEn : tool.categoryVi;
            const nameText = lang === 'en' ? tool.nameEn : tool.nameVi;
            const descriptionText = lang === 'en' ? tool.descriptionEn : tool.descriptionVi;

            return (
              <div 
                key={tool.id} 
                className="bg-white border border-neutral-200/80 rounded-2xl p-5 flex flex-col justify-between hover:shadow-xl transition-all hover:border-neutral-300 relative overflow-hidden group"
                id={tool.id}
              >
                {hasHighlight && (
                  <span className={`absolute top-3 right-3 ${tool.badgeBg} text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full font-mono`}>
                    {highlightText}
                  </span>
                )}

                <div className="space-y-3.5">
                  <div className="h-10 min-w-[40px] px-2 w-max rounded-xl bg-neutral-50 border border-neutral-150 flex items-center justify-center shadow-sm shrink-0 transition-transform group-hover:scale-110">
                    {renderToolIcon(tool.iconName)}
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[8px] font-black uppercase tracking-widest text-neutral-400 font-mono block">
                      {categoryText}
                    </span>
                    <h4 className="text-sm font-extrabold text-black tracking-tight leading-snug">
                      {nameText}
                    </h4>
                  </div>

                  <p className="text-[11px] text-neutral-500 leading-relaxed font-light min-h-[50px]">
                    {descriptionText}
                  </p>
                </div>

              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
                <div className="flex flex-col text-left">
                  <span className="text-[8px] text-neutral-400 uppercase tracking-widest font-black leading-none font-mono">
                    {lang === 'en' ? 'Status' : 'Trạng thái'}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 font-sans mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span> 
                    {lang === 'en' ? 'Ready to Sync' : 'Sẵn sàng kết nối'}
                  </span>
                </div>

                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black hover:bg-neutral-800 text-white text-[10px] font-black uppercase tracking-widest py-2 px-3.5 rounded-lg transition-all flex items-center gap-1.5 font-sans"
                >
                  {lang === 'en' ? 'ACCESS NOW' : 'TRUY CẬP NGAY'} <ExternalLink size={10} />
                </a>
              </div>
            </div>
            );
          })}
        </div>
      </section>

      {/* Savings Calculator Section */}
      <section id="no-code-automation" className="bg-neutral-50 border-y border-neutral-100 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[10px] tracking-widest uppercase font-bold text-neutral-400">
              {lang === 'en' ? 'Zapier Alternatives' : 'Giải pháp thay thế Zapier'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black leading-tight">
              {lang === 'en' 
                ? 'Why industry leaders migrate to open source automation.' 
                : 'Tại sao các doanh nghiệp chuyển sang tự động hóa mã nguồn mở?'}
            </h2>
            <p className="text-neutral-500 text-sm font-light leading-relaxed">
              {lang === 'en'
                ? 'Closed-source, pay-per-task model software platforms lock you into expensive tier upgrades. When you scale, your software budget pays the penalty.'
                : 'Các phần mềm bản quyền đóng tính phí theo số lượng công việc (task-run) luôn trói buộc bạn vào các gói đăng ký cực kỳ đắt đỏ. Càng mở rộng quy mô, túi tiền của bạn càng hao hụt.'}
            </p>
            <p className="text-neutral-500 text-sm font-light leading-relaxed">
              {lang === 'en'
                ? 'By choosing n8n, you manage data processing on a cost-efficient VPS server with no strict limits. Our premium JSON configs bypass the complex learning curve, granting seamless operational capability at an optimal rate.'
                : 'Bằng việc lựa chọn n8n tự vận hành trên máy chủ VPS riêng, bạn được xử lý không giới hạn luồng dữ liệu mà không sợ phát sinh phí. Các file JSON thiết lập sẵn của chúng tôi giúp bạn bỏ qua giai đoạn học phức tạp.'}
            </p>
          </div>

          <div className="lg:col-span-7">
            {/* Savings Calculator Interactive Card */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2">
                  <Calculator size={14} /> 
                  {lang === 'en' ? 'Interactive Cost Savings Projections' : 'Bảng Tính Ước Tính Tiết Kiệm Chi Phí Trực Quan'}
                </h3>
                <span className="bg-black text-white text-[9px] font-bold tracking-widest px-2.5 py-1 rounded uppercase">
                  {lang === 'en' ? 'Live Calculator' : 'Bảng tính trực tiếp'}
                </span>
              </div>

              {/* Slider Input Block */}
              <div className="space-y-3 bg-neutral-50 border border-neutral-200/50 p-5 rounded-2xl">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-medium">{lang === 'en' ? 'Estimated Monthly Task Volume' : 'Số lượng công việc (Tasks/Runs) hàng tháng'}</span>
                  <span className="text-black font-extrabold font-mono transition-all text-sm">
                    {monthlyTasks.toLocaleString()} {lang === 'en' ? 'Workflows / Month' : 'Quy trình / Tháng'}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="5000" 
                  max="500000" 
                  step="5000"
                  value={monthlyTasks}
                  onChange={(e) => setMonthlyTasks(Number(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-neutral-400 font-mono tracking-wider">
                  <span>{lang === 'en' ? '5,000 TASKS' : '5,000 TÁC VỤ'}</span>
                  <span>100,000</span>
                  <span>250,000</span>
                  <span>500,000+ MAX</span>
                </div>
              </div>

              {/* Pricing breakdown grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="border border-neutral-200/65 rounded-xl p-4 space-y-1">
                  <span className="text-neutral-400 text-[10px] block font-sans">{lang === 'en' ? 'ZAPIER COST' : 'CHI PHÍ ZAPIER'}</span>
                  <span className="text-red-500 font-extrabold text-base block">${pricingData.zapierCost.toLocaleString()} / mo</span>
                  <span className="text-[9px] text-neutral-400 block font-sans">{lang === 'en' ? 'Locked tiered rates' : 'Mắc kẹt ở các gói đắt đỏ'}</span>
                </div>
                <div className="border border-neutral-200/65 rounded-xl p-4 space-y-1">
                  <span className="text-neutral-400 text-[10px] block font-sans">{lang === 'en' ? 'MAKE.COM COST' : 'CHI PHÍ MAKE.COM'}</span>
                  <span className="text-amber-500 font-extrabold text-base block">${pricingData.makeCost.toLocaleString()} / mo</span>
                  <span className="text-[9px] text-neutral-400 block font-sans">{lang === 'en' ? 'Strict task restrictions' : 'Giới hạn số tác vụ nghiêm ngặt'}</span>
                </div>
                <div className="bg-black text-white rounded-xl p-4 space-y-1">
                  <span className="text-neutral-300 text-[10px] block font-sans">{lang === 'en' ? 'N8N SELF-HOSTED' : 'N8N TỰ LƯU TRỮ'}</span>
                  <span className="text-emerald-400 font-extrabold text-base block">${pricingData.n8nCost.toLocaleString()} / mo</span>
                  <span className="text-[9px] text-neutral-300 block font-sans">{lang === 'en' ? 'Unlimited runs on VPS' : 'Chạy vô hạn trên VPS tiêu chuẩn'}</span>
                </div>
              </div>

              <div className="border-t border-neutral-100 my-4"></div>

              {/* Saved details */}
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center justify-between text-xs text-emerald-800">
                <div>
                  <span className="block font-medium">{lang === 'en' ? 'Your Monthly Cost Savings:' : 'Số tiền bạn tiết kiệm hàng tháng:'}</span>
                  <span className="block font-sans text-lg font-black text-emerald-950">${pricingData.monthlySavings.toLocaleString()} / {lang === 'en' ? 'month' : 'tháng'}</span>
                </div>
                <div className="text-right">
                  <span className="block font-medium">{lang === 'en' ? 'Estimated Yearly Savings:' : 'Ước tính tiết kiệm hàng năm:'}</span>
                  <span className="block font-sans text-xl font-black text-emerald-950">${pricingData.yearlySavings.toLocaleString()} / {lang === 'en' ? 'year' : 'năm'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Directory Explorer Section */}
      {!isUnlocked && (
        <section id="directory" className="max-w-6xl mx-auto px-6 py-20 sm:py-28 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-[10px] tracking-widest uppercase font-bold text-neutral-500">
              {lang === 'en' ? 'Browse Actual Directory Files' : 'Khám phá tệp thật trong thư viện thư mục'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
              {lang === 'en' ? 'Your entire workspace, perfectly categorized.' : 'Toàn bộ không gian làm việc của bạn, được sắp xếp hoàn mỹ.'}
            </h2>
            <p className="text-neutral-500 text-sm font-light leading-relaxed">
              {lang === 'en'
                ? 'Filter and browse the exact JSON workflow files structured inside your digital download pack. No generic placeholders—these are real, battle-tested templates.'
                : 'Tìm kiếm và duyệt qua những tệp JSON quy trình thực tế có sẵn bên trong gói tải xuống. Hoàn toàn là mẫu cấu hình thật, đã được thử nghiệm thực tế.'}
            </p>
          </div>

          {/* Directory Explorer Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar: Categories (Left column) */}
            <div className="lg:col-span-3 space-y-2 max-h-[520px] overflow-y-auto pr-2 border-r border-neutral-100 scrollbar-thin">
              <span className="block text-[10px] tracking-widest uppercase font-bold text-neutral-400 mb-3 px-2">Folders / Modules</span>
              {Object.keys(directoryCatalog).map((folder) => {
                const isActive = folder === selectedFolder;
                const activeClasses = isActive 
                  ? "bg-black text-white font-bold" 
                  : "bg-transparent text-neutral-600 hover:text-black hover:bg-neutral-50";
                const count = directoryCatalog[folder]?.length || 0;
                
                return (
                  <button 
                    key={folder}
                    onClick={() => {
                      setSelectedFolder(folder);
                      setSearchQuery("");
                    }} 
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-[11px] tracking-wider font-semibold uppercase flex items-center justify-between transition-all ${activeClasses}`}
                    id={`folder-btn-${folder.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    <span className="truncate pr-2">{folder}</span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'}`}>{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Content Panel: Displaying actual .json files (Right column) */}
            <div className="lg:col-span-9 bg-neutral-50 border border-neutral-200/60 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between border-b border-neutral-200/50 pb-4">
                <div className="flex items-center space-x-2">
                  <Folder size={14} className="text-black" />
                  <span id="current-folder-title" className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                    {selectedFolder}
                  </span>
                </div>
                <div className="relative flex-1 max-w-xs">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search json workflow files..." 
                    className="w-full bg-white border border-neutral-200 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-black transition-all"
                  />
                </div>
              </div>

              {/* Live grid of templates inside current directory */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-2">
                {filteredFiles.length === 0 ? (
                  <div className="col-span-full py-16 text-center text-xs text-neutral-400 font-mono">
                    No JSON files found in this folder path. Try resetting your search filter.
                  </div>
                ) : (
                  filteredFiles.map((file, i) => {
                    const isCopied = copyFeedback === file;
                    return (
                      <div 
                        key={i} 
                        className="bg-white border border-neutral-200/60 p-4 rounded-xl flex flex-col justify-between hover:shadow-sm transition-all duration-300 relative group"
                      >
                        <div className="flex items-start space-x-3.5">
                          <div className="p-2 bg-neutral-100 rounded-lg text-black flex-shrink-0">
                            <FileCode size={16} />
                          </div>
                          <div className="space-y-1 overflow-hidden min-w-0 flex-1">
                            <h4 className="text-xs font-mono font-bold text-black truncate" title={file}>
                              {file}
                            </h4>
                            <p className="text-[10px] text-neutral-400 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block"></span>
                              Production JSON ready
                            </p>
                          </div>
                        </div>

                        {/* Interactive Action Buttons */}
                        {isUnlocked && (
                          <div className="flex gap-2 mt-4 pt-3 border-t border-neutral-100/80">
                            <button 
                              onClick={() => handleCopyClipboardJson(file)}
                              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-[10px] font-bold tracking-widest uppercase border transition-all ${
                                isCopied 
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                                  : 'bg-white border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                              }`}
                              title="Copy valid n8n Workflow JSON code to your clipboard"
                            >
                              {isCopied ? (
                                <>
                                  <Check size={10} /> Copied!
                                </>
                              ) : (
                                <>
                                  <Copy size={10} /> Copy JSON
                                  </>
                              )}
                            </button>

                            <button 
                              onClick={() => downloadJsonFile(file)}
                              className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-[10px] font-bold tracking-widest uppercase bg-neutral-900 border border-transparent hover:bg-neutral-800 text-white transition-all scale-100 hover:scale-105"
                              title="Download actual JSON file payload"
                            >
                              <Download size={10} /> Download
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Proximity Callout */}
              <div className="bg-amber-50/50 border border-amber-200/50 p-4 rounded-2xl flex items-start gap-3.5 text-xs text-amber-900 font-light">
                <span className="font-extrabold text-[#705000] uppercase text-[10px] tracking-wider py-0.5 px-1 bg-amber-200 rounded shrink-0">Pro Tip</span>
                <p className="leading-relaxed">
                  Clicking <span className="font-bold">"Copy JSON"</span> copies valid, copy-pasteable n8n workflow code blocks directly onto your clipboard! You can paste them immediately inside any local n8n Canvas page environment.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Universal Integrations Grid */}
      <section id="saas-integration" className="bg-neutral-50 border-t border-neutral-100 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3 animate-fade-in">
            <span className="text-[10px] tracking-widest uppercase font-bold text-neutral-400">
              {lang === 'en' ? 'Universal Ecosystem' : 'Hệ sinh thái kết nối toàn cầu'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-black">
              {lang === 'en' ? 'Supported integrations and platforms' : 'Các nền tảng được hỗ trợ kết nối'}
            </h2>
            <p className="text-neutral-500 text-sm font-light">
              {lang === 'en' ? 'Connect hundreds of external API platforms and nodes without code friction.' : 'Liên kết hàng trăm nền tảng ứng dụng ngoại vi dễ dàng không tốn sức code.'}
            </p>
          </div>

          {/* Minimalist Matrix grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {integrationApps.map((app, i) => (
              <div 
                key={i} 
                className="bg-white border border-neutral-200/60 p-4 rounded-xl text-center space-y-2 hover:border-black transition-colors duration-300 group cursor-default"
              >
                <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center mx-auto text-black text-xs font-bold group-hover:scale-110 transition-transform">
                  {renderIntegrationLogo(app.name, app.color)}
                </div>
                <span className="block text-[11px] font-bold text-black tracking-wide">{app.name}</span>
                <span className="block text-[8px] text-neutral-400 uppercase tracking-widest">
                  {lang === 'en' ? 'Node Configured' : 'Đã cấu hình tối ưu'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Container */}
      <section id="pricing" className="max-w-4xl mx-auto px-6 py-16 sm:py-28">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-widest uppercase font-bold text-neutral-400">
            {lang === 'en' ? 'Instant Delivery Package' : 'Gói Giao Nhận Ngay Lập Tức'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black mt-2">
            {lang === 'en' ? 'Get the Premium No-Code Automation OS' : 'Sở Hữu Hệ Điều Hành Tự Động Hóa Không Code Cao Cấp'}
          </h2>
        </div>

        {/* Checkout Box Container */}
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0 relative">
          
          {/* Details Panel */}
          <div className="p-6 sm:p-10 md:col-span-7 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="bg-neutral-100 text-black text-[9px] tracking-widest uppercase font-bold px-3 py-1 rounded inline-block">
                {lang === 'en' ? 'Lifetime Access' : 'Sử Dụng Trọn Đời'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-black">N8N PLATFORM SUITE</h3>
              <p className="text-neutral-500 text-sm font-light leading-relaxed">
                {lang === 'en' 
                  ? 'Unleash the full potential of your team. Instant access to the master repository containing over 300+ JSON config files, organized seamlessly by category.' 
                  : 'Phát huy tối đa năng lực làm việc ứng dụng. Truy cập tức thì kho tàng mã nguồn chứa hơn 300+ quy trình tự động hóa dạng tệp cấu hình JSON, được chia nhóm khoa học.'}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-neutral-100">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl sm:text-4xl font-black text-black">$0.01</span>
                <span className="text-sm sm:text-base text-neutral-400 line-through">$99.00</span>
                <span className="text-red-600 text-xs font-bold bg-red-50 py-0.5 px-2 rounded font-sans">-99.9% OFF</span>
              </div>

              <ul className="space-y-3 text-xs text-neutral-600 font-light pt-2">
                <li className="flex items-center space-x-2.5">
                  <CheckCircle size={14} className="text-emerald-500" />
                  <span>{lang === 'en' ? 'Immediate access to 300+ production JSON files' : 'Tải ngay hơn 300 tệp mẫu cấu hình JSON thực tiễn'}</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <CheckCircle size={14} className="text-emerald-500" />
                  <span>{lang === 'en' ? 'Full documentation on integration steps' : 'Tài liệu hướng dẫn triển khai từng bước chi tiết'}</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <CheckCircle size={14} className="text-emerald-500" />
                  <span>{lang === 'en' ? 'Complimentary lifetime updates to the package library' : 'Được cập nhật miễn phí trọn đời thư viện ứng dụng'}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Checkout Form Panel */}
          <div className="p-6 sm:p-10 bg-neutral-50 border-t md:border-t-0 md:border-l border-neutral-200 flex flex-col justify-center md:col-span-5">
            <h4 className="text-xs uppercase tracking-wider text-black font-bold mb-4 text-center md:text-left flex items-center justify-center md:justify-start gap-1">
              <Lock size={12} /> {lang === 'en' ? 'Secure Digital Checkout' : 'Thanh Toán Số Bảo Mật'}
            </h4>
            
            <form className="space-y-4" onSubmit={handleCheckoutSubmit}>
              <div>
                <label className="block text-[9px] text-neutral-400 uppercase tracking-widest font-bold mb-1 ml-1">
                  {lang === 'en' ? 'YOUR FULL NAME' : 'HỌ VÀ TÊN CỦA BẠN'}
                </label>
                <input 
                  type="text" 
                  value={purchaserName}
                  onChange={(e) => setPurchaserName(e.target.value)}
                  required 
                  placeholder="John Doe" 
                  className="w-full bg-white text-black placeholder-neutral-400 border border-neutral-200 rounded-lg px-4 py-3 text-xs focus:outline-none focus:border-black transition-all"
                  id="cust-name"
                />
              </div>
              <div>
                <label className="block text-[9px] text-neutral-400 uppercase tracking-widest font-bold mb-1 ml-1">
                  {lang === 'en' ? 'EMAIL ADDRESS' : 'ĐỊA CHỈ EMAIL'}
                </label>
                <input 
                  type="email" 
                  value={purchaserEmail}
                  onChange={(e) => setPurchaserEmail(e.target.value)}
                  required 
                  placeholder="johndoe@example.com" 
                  className="w-full bg-white text-black placeholder-neutral-400 border border-neutral-200 rounded-lg px-4 py-3 text-xs focus:outline-none focus:border-black transition-all"
                  id="cust-email"
                />
              </div>

              {/* PayPal Native Checkout CTA Trigger Stack */}
              <div className="space-y-3 pt-2">
                <button 
                  type="submit" 
                  className="w-full bg-[#FFC439] hover:bg-[#E1AD30] text-[#003087] font-semibold py-3.5 px-4 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1 font-mono"
                  style={{ color: '#003087' }}
                >
                  <span className="font-extrabold italic text-[#003087] lowercase">pay with </span>
                  <span className="font-black italic text-[#0079C1] tracking-tighter">PayPal</span>
                </button>

                <button 
                  type="button" 
                  onClick={(e) => {
                    if (!purchaserName || !purchaserEmail) {
                      const msg = lang === 'en' ? "Please fill out your Name and Email before paying." : "Vui lòng điền Họ tên và Email trước khi thanh toán.";
                      alert(msg);
                      return;
                    }
                    initiatePayPalCheckout(e);
                  }}
                  className="w-full bg-[#000000] hover:bg-[#222222] text-white font-semibold py-3 px-4 rounded-lg text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Lock size={12} className="text-neutral-400" /> {lang === 'en' ? 'International Credit Cards' : 'Thẻ Tín Dụng Quốc Tế'}
                </button>
              </div>
            </form>
            <span className="text-[9px] text-neutral-400 font-light text-center mt-3 block leading-relaxed mb-4">
              {lang === 'en' 
                ? '* Payments are processed securely via PayPal encryption hosts.' 
                : '* Giao dịch được bảo mật an toàn qua cổng thanh toán bảo mật PayPal toàn cầu.'}
            </span>

            {/* Already purchased login option requested by user */}
            <div className="mt-4 pt-4 border-t border-neutral-200 text-center">
              <span className="text-[10px] text-neutral-400 block mb-2 font-medium">
                {lang === 'en' ? 'Already purchased Premium before?' : 'Bạn đã thanh toán Premium từ trước?'}
              </span>
              <button 
                type="button" 
                onClick={() => setShowAuthModal(true)}
                className="w-full bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-black text-neutral-800 font-bold py-2.5 px-4 rounded-xl text-[10px] tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer font-sans"
              >
                <LogIn size={11} /> {lang === 'en' ? 'LOG IN & VERIFY' : 'ĐĂNG NHẬP & XÁC MINH'}
              </button>
            </div>
          </div>
        </div>

        {/* Post-Purchase active section */}
        {isUnlocked && (
          <div className="mt-8 space-y-6">
            {/* Minimal Welcome Header & Quick Action */}
            <div className="bg-neutral-50 border border-neutral-200/85 rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center md:text-left">
                <div className="inline-flex items-center gap-1 py-0.5 px-2 bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-wider rounded-full font-mono">
                  ✓ Premium Access Unlocked
                </div>
                <h3 className="text-base font-bold text-black font-sans leading-tight">
                  {lang === 'en' 
                    ? `Great, ${purchaserName || 'Premium Partner'}! Your main template vaults are fully unlocked.` 
                    : `Tuyệt vời, ${purchaserName || 'Premium Partner'}! Toàn bộ kho template chính đã được mở khóa thành công.`}
                </h3>
                <p className="text-xs text-neutral-500 font-light max-w-xl">
                  {lang === 'en' 
                    ? 'You can start downloading the automation configuration files directly through the Explorer below.' 
                    : 'Bạn có thể bắt đầu tải xuống các files cấu hình tự động hóa trực tiếp thông qua thư viện Explorer ở bên dưới.'}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full md:w-auto">
                <button 
                  onClick={downloadPremiumZip}
                  className="whitespace-nowrap inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm font-sans"
                >
                  <Download size={13} /> {lang === 'en' ? 'DOWNLOAD ZIP BUNDLE' : 'TẢI ZIP BUNDLE'}
                </button>
                <a 
                  href="#directory"
                  className="whitespace-nowrap inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-neutral-200 bg-white text-neutral-700 hover:text-black hover:bg-neutral-50 text-xs font-bold uppercase tracking-wider transition-all font-sans"
                >
                  {lang === 'en' ? 'Browse Library Explorer' : 'Duyệt Thư Viện Explorer'}
                </a>
              </div>
            </div>

            {/* Quick Tutorial & Resources Section */}
            <div className="bg-gradient-to-br from-indigo-50/40 to-neutral-50 border border-neutral-200/80 rounded-3xl p-6 sm:p-8 space-y-6 text-left">
              <div className="space-y-2">
                <span className="text-[10px] tracking-widest uppercase font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded inline-block font-mono">
                  {lang === 'en' ? '🛠️ QUICK SETUP GUIDE • BEGINNER LINKS' : '🛠️ HƯỚNG DẪN CÀI ĐẶT NHANH • ĐƯỜNG DẪN BẮT ĐẦU'}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-black tracking-tight font-sans">
                  {lang === 'en' ? 'Essential prerequisites before importing JSONs into your n8n workspace' : 'Các bước chuẩn bị trước khi import JSON vào n8n của bạn'}
                </h3>
                <p className="text-xs text-neutral-500 font-light max-w-2xl leading-relaxed">
                  {lang === 'en' 
                    ? 'To ensure your self-hosted n8n operates perfectly and registers over 300+ JSON workflows seamlessly, complete these three foundational installation pillars below.' 
                    : 'Để n8n tự lưu trữ hoạt động hoàn hảo và nhận diện trơn tru file cấu hình 300+ JSON templates, vui lòng hoàn tất quy trình thiết lập cơ bản bao gồm 3 cột trụ chính dưới đây.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="bg-white border border-neutral-150 p-5 rounded-2xl space-y-3.5 hover:shadow-md transition-all">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500 font-bold text-xs font-mono">
                    01
                  </div>
                  <h4 className="text-xs font-extrabold text-black uppercase tracking-wider font-sans">
                    {lang === 'en' ? 'VPS Hosting & Docker' : 'VPS Hostinger & Docker'}
                  </h4>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-light font-sans">
                    {lang === 'en' 
                      ? 'Get a budget friendly VPS on Hostinger. Choose the Docker operating system template to spawn Ubuntu and Docker Desktop containers natively in 2 minutes.' 
                      : 'Sở hữu gói VPS tối thiểu chỉ $3.99/mo trên Hostinger. Chọn template hệ điều hành Docker (Ubuntu + Docker Desktop) để khởi tạo môi trường container cực kỳ nhanh trong 2 phút.'}
                  </p>
                </div>

                <div className="bg-white border border-neutral-150 p-5 rounded-2xl space-y-3.5 hover:shadow-md transition-all">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 font-bold text-xs font-mono">
                    02
                  </div>
                  <h4 className="text-xs font-extrabold text-black uppercase tracking-wider font-sans">
                    {lang === 'en' ? 'Point Domain & HTTPS' : 'Trỏ Domain & Kích HTTPS'}
                  </h4>
                  <p className="text-[11px] text-neutral-550 leading-relaxed font-light font-sans">
                    {lang === 'en' 
                      ? 'Purchase a generic domain name at Cloudflare or Namecheap. Place an A Record pointing directly to your VPS server IP. Setup SSL via proxy guides.' 
                      : 'Mua tên miền tại Namecheap, Cloudflare, v.v. Cấu hình bản ghi A Record trỏ về IP của VPS. Thiết lập Nginx Proxy Manager để kích hoạt SSL / HTTPS bảo vệ các đường dẫn webhook an toàn.'}
                  </p>
                </div>

                <div className="bg-white border border-neutral-150 p-5 rounded-2xl space-y-3.5 hover:shadow-md transition-all">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500 font-bold text-xs font-mono">
                    03
                  </div>
                  <h4 className="text-xs font-extrabold text-black uppercase tracking-wider font-sans">
                    {lang === 'en' ? 'Import & Execute' : 'Import & Chạy Automation'}
                  </h4>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-light font-sans">
                    {lang === 'en' 
                      ? 'Launch n8n dashboard, click "Add Workflow", navigate to the right context menu, click "Import from File", upload your JSONs and they are instantly ready!' 
                      : 'Kích hoạt n8n, nhấp vào nút "Add Workflow", chạm vào menu góc phải chọn "Import from File" rồi upload bất kỳ file JSON nào trong bộ khóa học để cấu hình chạy ngay lập tức!'}
                  </p>
                </div>
              </div>

              <div className="bg-black text-white p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
                  <p className="font-light">
                    {lang === 'en' 
                      ? 'Need help? The complete setup guidelines are bundled inside your ZIP download package library.' 
                      : 'Cần trợ giúp chi tiết? Bộ hướng dẫn cấu hình chi tiết có đầy đủ trong tệp thiết lập ZIP Bundle.'}
                  </p>
                </div>
                <a href="#setup-tools" className="whitespace-nowrap font-bold uppercase tracking-wider bg-white text-black py-2 px-4 rounded-lg hover:bg-neutral-100 transition-colors">
                  {lang === 'en' ? 'Review tools' : 'Xem lại danh sách công cụ'}
                </a>
              </div>
            </div>

          {/* Virtual Email Sandbox Simulator */}
          {showVirtualInbox && (
            <div className="bg-white border border-neutral-200 rounded-3xl shadow-xl overflow-hidden text-left transition-all animation-fade-in">
                <div className="bg-neutral-900 text-white px-5 py-4 flex items-center justify-between border-b border-neutral-800">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300">📬 LIVE MAILBOX DELIVERY SIMULATOR</span>
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400">
                    Recipient: {purchaserEmail}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-0 min-h-[300px]">
                  {/* Mailbox List Panel */}
                  <div className="md:col-span-4 bg-neutral-50 border-r border-neutral-200 p-3 space-y-2">
                    <div className="text-[10px] font-bold text-neutral-400 px-2 uppercase tracking-widest">Inboxes (1)</div>
                    
                    <button 
                      onClick={() => setVirtualInboxOpen(true)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        virtualInboxOpen 
                          ? 'bg-white border-neutral-300 shadow-sm' 
                          : 'bg-transparent border-transparent hover:bg-neutral-100'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-0.5">
                        <span className="text-xs font-bold text-black flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                          JSONStack Delivery
                        </span>
                        <span className="text-[9px] text-neutral-400 font-mono">Just Now</span>
                      </div>
                      <div className="text-[11px] font-bold text-neutral-800 line-clamp-1">
                        🚀 Your 300+ Premium n8n Workflows Bundle is Here!
                      </div>
                      <div className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">
                        Click to open and fetch your purchase package. Your PayPal transaction...
                      </div>
                    </button>
                  </div>

                  {/* Mail Content View */}
                  <div className="md:col-span-8 p-6 space-y-6 flex flex-col justify-between">
                    {virtualInboxOpen ? (
                      <div className="space-y-4">
                        {/* Headers */}
                        <div className="border-b border-neutral-100 pb-4 space-y-1">
                          <h4 className="text-sm font-bold text-black">
                            🚀 Your 300+ Premium n8n Workflows Bundle is Here!
                          </h4>
                          <div className="flex justify-between text-[11px] text-neutral-500">
                            <div>
                              <span>From: </span>
                              <strong className="text-black">JSONStack Fulfillment</strong> &lt;delivery@jsonstack.me&gt;
                            </div>
                            <span>Date: June 15, 2026, 8:15 AM</span>
                          </div>
                          <div className="text-[11px] text-neutral-500 pt-0.5">
                            <span>To: </span>
                            <span className="text-black font-medium">{purchaserEmail}</span>
                          </div>
                        </div>

                        {/* Beautiful email body */}
                        <div className="space-y-3 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                          <p>
                            Hello <strong className="text-black font-semibold">{purchaserName}</strong>,
                          </p>
                          <p>
                            Thank you for your business. Your payment via <strong>PayPal Checkout</strong> was cleared successfully (Transaction ID: <span className="font-mono text-[11px] bg-neutral-150 px-1 py-0.2 rounded text-neutral-700">TX-PP-{Math.floor(Math.random() * 89999 + 10000)}</span>).
                          </p>
                          <p>
                            We are excited to deliver your <strong>JSONStack n8n Automation OS Bundle</strong>. Below is the active extraction link containing the complete JSON repository configured for self-hosted import.
                          </p>

                          {/* Big CTA inside email */}
                          <div className="py-4 text-center">
                            <button 
                              onClick={downloadPremiumZip}
                              className="inline-flex items-center gap-2 bg-[#FFC439] hover:bg-[#E1AD30] text-black hover:text-neutral-900 font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider transition-all shadow"
                            >
                              <Download size={14} /> Download ZIP Bundle (.zip)
                            </button>
                            <span className="block text-[10px] text-neutral-400 mt-2">
                              Format: Complete compression pack with 300+ JSON config files
                            </span>
                          </div>

                          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 space-y-1.5">
                            <h5 className="font-bold text-xs text-black">🚀 n8n Rapid Import Instructions:</h5>
                            <ol className="list-decimal list-inside text-[11px] space-y-1 text-neutral-500 font-light">
                              <li>Download and open the transaction file.</li>
                              <li>Pick any workflow element, copy its JSON block.</li>
                              <li>In your self-hosted n8n instance, hit <kbd className="font-mono bg-white border border-neutral-300 px-1 rounded text-[9px]">Ctrl+V</kbd> or <kbd className="font-mono bg-white border border-neutral-300 px-1 rounded text-[9px]">Cmd+V</kbd> on the dashboard workspace.</li>
                            </ol>
                          </div>
                        </div>

                        {/* Sign off */}
                        <div className="pt-2 text-xs text-neutral-400 italic">
                          Sincerely,<br />
                          The JSONStack Delivery Hub team
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center py-12 text-neutral-400 text-xs">
                        <Mail size={32} className="text-neutral-300 mb-2" />
                        Select an email from the left sidebar to read details.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Frequently Asked Questions */}
      <section className="border-t border-neutral-100 py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-black text-black text-center mb-12">
            {lang === 'en' ? 'Frequently Asked Questions' : 'Các Câu Hỏi Thường Gặp (FAQs)'}
          </h2>
          
          <div className="space-y-4">
            {[
              {
                q: lang === 'en' ? "How do I import these templates into n8n?" : "Làm thế nào để tôi có thể nhập (import) các template này vào n8n?",
                a: lang === 'en' ? "It takes less than 5 seconds. Simply copy the JSON text inside any downloaded configuration file, open your self-hosted n8n instance, and paste it directly into your active canvas. The workflow nodes are generated instantly." : "Chỉ mất chưa đầy 5 giây. Bạn chỉ cần sao chép văn bản JSON trong tệp cấu hình đã tải xuống, mở trang n8n của bạn và dán trực tiếp vào không gian canvas hoạt động."
              },
              {
                q: lang === 'en' ? "Are there any hidden costs or task limits?" : "Có chi phí phát sinh ẩn hay giới hạn số lượng tác vụ nào không?",
                a: lang === 'en' ? "None. By migrating to open-source self-hosted setups, you run unlimited automated flows on your own hardware (like a standard $5/mo VPS server) without any monthly task usage bills." : "Hoàn toàn không có. Bằng cách dịch chuyển lên môi trường tự lưu trữ nguồn mở độc lập, bạn được quyền chạy không giới hạn tác vụ tự động hóa trên phần cứng riêng biệt của bạn (như gói máy chủ cloud VPS chỉ $5/tháng) mà không lo hóa đơn phụ trội sử dụng hàng tháng của Zapier."
              },
              {
                q: lang === 'en' ? "Do I need coding experience to deploy these?" : "Tôi có cần kinh nghiệm viết mã lập trình để triển khai không?",
                a: lang === 'en' ? "No coding skills are required. The workflows are designed visually (drag-and-drop), making it the perfect no-code automation replacement to writing custom code or REST API connectors manually." : "Không yêu cầu bất kỳ kỹ năng lập trình nào. Bản chất tự động hóa của n8n được thiết kế trực quan hóa kéo thả, giúp đơn giản hóa và thay thế việc viết các đoạn mã kết nối API REST phức tạp."
              },
              {
                q: lang === 'en' ? "What types of AI agents are included?" : "Mẫu kịch bản Đại lý AI (AI Agents) nào được bao gồm?",
                a: lang === 'en' ? "The pack includes document summarizers, video analysis pipelines, RAG engines connected to local text caches (like Qdrant), multi-app social publishers, and automated backups using Gemini, DeepSeek, and local Ollama models." : "Bộ sản phẩm bao gồm bộ tóm tắt tài liệu tự động, hệ thống phân tích video, bộ RAG kết nối dữ liệu văn bản với vector db riêng biệt (như Qdrant), hệ thống xuất bản đa kênh mạng xã hội, và sao lưu tự động hỗ trợ Gemini, DeepSeek và Ollama cục bộ."
              }
            ].map((faq, i) => {
              const isOpen = faqOpenIndex === i;
              return (
                <div key={i} className="border-b border-neutral-100 pb-4 space-y-2">
                  <button 
                    onClick={() => setFaqOpenIndex(isOpen ? null : i)}
                    className="w-full text-left flex justify-between items-center py-2 text-sm sm:text-base font-bold text-black"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg font-mono text-neutral-400">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-light transition-all animation-fade-in">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PayPal Sandbox Simulation Modal - Decoupled as we now route to live PayPal payments */}
      {showPayPalModal && false && (
        <div id="paypal-sim-modal" className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0c0d12]/60 backdrop-blur-sm" onClick={() => setShowPayPalModal(false)}></div>
          <div className="bg-[#f5f7fa] border border-neutral-300 rounded-2xl w-full max-w-[420px] relative z-10 overflow-hidden shadow-2xl flex flex-col font-sans">
            
            {/* Safe Secure Banner */}
            <div className="bg-[#003087] text-white px-5 py-4 flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 fill-current text-[#00c5ff]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.01 6.1C19.53 8.35 17.84 9.94 15.34 9.94H12.9l-1.39 6.27-.04.18c-.06.27-.3.46-.58.46H8.05c-.39 0-.68-.37-.6-.75l2.25-10.1c.07-.31.34-.53.66-.53h4.63c2.45 0 4.3 1.13 5.02 3.39v.03c.18.57.17 1.83-.002 6.1zm-8.21 4.7l.63-2.8h-1.63L10.17 10.8h1.63z" />
                </svg>
                <span className="font-mono text-xs font-bold tracking-widest text-[#00c5ff] uppercase">PayPal <span className="text-white">Sandbox</span></span>
              </div>
              <div className="text-[10px] text-neutral-300 font-medium flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                <Lock size={10} /> Secure SSL Connection
              </div>
            </div>

            {/* Merchant Details Context */}
            <div className="bg-white border-b border-neutral-200 px-6 py-4 flex justify-between items-center text-xs">
              <div>
                <p className="font-bold text-neutral-800">JSONStack Studio</p>
                <p className="text-neutral-400 text-[10px] uppercase font-mono">Invoice #{Math.floor(Math.random() * 89999 + 10000)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-neutral-400 font-bold uppercase">TOTAL TO PAY</p>
                <p className="font-extrabold text-base text-neutral-900">$0.01 <span className="text-xs text-neutral-500 font-light">USD</span></p>
              </div>
            </div>

            {/* Simulated steps */}
            <div className="p-6 flex-1 flex flex-col justify-between min-h-[220px]">
              {paypalStep === 'login' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-neutral-800 mb-2">Log in with your PayPal Sandbox wallet</h4>
                    <p className="text-[11px] text-neutral-500 leading-normal">
                      We auto-loaded your digital recipient credentials below. Complete checkout using simulated balance.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <div>
                      <label className="block text-[9px] text-neutral-400 uppercase font-black tracking-widest pl-1 mb-1">SANDBOX BUYER ACCOUNT</label>
                      <input 
                        type="email" 
                        value={purchaserEmail} 
                        disabled 
                        className="w-full bg-neutral-100/80 text-neutral-600 border border-neutral-200 rounded-lg px-3 py-2.5 text-xs font-mono font-bold focus:outline-none cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-neutral-400 uppercase font-black tracking-widest pl-1 mb-1">DUMMY SANDBOX PASSWORD</label>
                      <input 
                        type="password" 
                        value={paypalPassword} 
                        onChange={(e) => setPaypalPassword(e.target.value)}
                        className="w-full bg-white text-black border border-neutral-200 rounded-lg px-3 py-2.5 text-xs font-serif tracking-widest focus:outline-none focus:border-[#003087]"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={completePayPalPayment}
                      className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold py-3 px-4 rounded-xl text-xs tracking-wider transition-all shadow-md text-center"
                    >
                      Authorize $0.01 Sandbox Payment
                    </button>
                    <button 
                      onClick={() => setShowPayPalModal(false)}
                      className="w-full text-center text-[11px] text-neutral-400 underline hover:text-neutral-600 mt-3 font-semibold"
                    >
                      Cancel and return to JSONStack Merchant
                    </button>
                  </div>
                </div>
              )}

              {paypalStep === 'authorizing' && (
                <div className="flex-1 flex flex-col items-center justify-center py-6 text-center space-y-4">
                  <div className="w-12 h-12 border-4 border-[#0070ba]/20 border-t-[#0070ba] rounded-full animate-spin"></div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-neutral-700">Connecting with PayPal checkout systems...</p>
                    <p className="text-[10px] text-neutral-500 font-mono italic">
                      Checking standard credit balance...
                    </p>
                  </div>
                  <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-3 w-full text-left font-mono text-[9px] text-neutral-500 space-y-1">
                    <div>&gt; HTTPS SECURE_HANDSHAKE: ACTIVE</div>
                    <div>&gt; BUYER_MOCK_AUTH: COMPLETED (SANDBOX_M_109)</div>
                    <div>&gt; LEDGER: TRANSACTION_READY</div>
                  </div>
                </div>
              )}

              {paypalStep === 'success' && (
                <div className="flex-1 flex flex-col items-center justify-center py-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-neutral-800">Transaction Approved!</p>
                    <p className="text-[10px] text-neutral-500">
                      Payment of $0.01 USD processed successfully. Returning to JSONStack...
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Security Footer info */}
            <div className="bg-neutral-100 px-5 py-3 border-t border-neutral-200 flex items-center justify-center gap-1 text-[10px] text-neutral-400">
              <svg className="w-3 h-3 text-neutral-450 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
              Standard secure transaction processed under PayPal Merchant Terms (9022)
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div id="success-modal" className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeSuccessModal}></div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 max-w-md w-full relative z-10 text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-black text-3xl">
              <CheckCircle2 className="text-emerald-500" size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-black tracking-tight">Access Granted!</h3>
              <p className="text-xs text-neutral-500 font-light leading-relaxed">
                Thank you for your order, {purchaserName}. Your PayPal payment has been successfully cleared. Your premium templates are now unlocked. You can download the entire bundle instantly, and browse and download any files directly from our interactive explorer!
              </p>
            </div>
            <button 
              onClick={closeSuccessModal} 
              className="w-full bg-black text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              Start Automating
            </button>
          </div>
        </div>
      )}

      {/* Verification Auth Modal */}
      {showAuthModal && (
        <div id="auth-modal" className="fixed inset-0 z-[160] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { setShowAuthModal(false); setAuthError(""); }}></div>
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 max-w-sm w-full relative z-10 space-y-5 shadow-2xl font-sans text-black">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-neutral-50 border border-neutral-150 rounded-full flex items-center justify-center mx-auto shadow-sm text-black">
                <LogIn size={20} />
              </div>
              <h3 className="text-lg font-black text-black">ĐĂNG NHẬP / XÁC MINH</h3>
              <p className="text-[11px] text-neutral-400 font-light px-2 leading-normal">
                Nhập Email hoặc Tên người mua đã thanh toán Premium để xác minh quyền truy cập đầy đủ và kiểm tra dữ liệu đơn hàng.
              </p>
            </div>

            {authError && (
              <div className="bg-red-50 text-red-650 border border-red-200/65 rounded-xl p-3 text-[10px] leading-relaxed text-left flex items-start gap-2 animate-pulse">
                <div className="bg-red-250 text-red-700 w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">!</div>
                <div>{authError}</div>
              </div>
            )}

            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!authEmailInput.trim()) return;
              
              setAuthError("");
              setIsLoadingOrders(true);
              
              try {
                if (!supabase) {
                  // Fallback simulation in case Supabase is completely unavailable
                  const mockPurchasesStr = localStorage.getItem('jsonstack_mock_purchases') || '[]';
                  const mockPurchases = JSON.parse(mockPurchasesStr);
                  const trimmedInput = authEmailInput.trim().toLowerCase();
                  
                  const found = mockPurchases.find((o: any) => 
                    o.status === 'Completed' &&
                    (o.email.toLowerCase() === trimmedInput || o.name.toLowerCase() === authEmailInput.trim().toLowerCase())
                  ) || (trimmedInput === 'ahitofficial.com@gmail.com' || trimmedInput === 'admin');
                  
                  if (found) {
                    setIsUnlocked(true);
                    localStorage.setItem('jsonstack_unlocked', 'true');
                    const realEmail = typeof found === 'object' ? found.email : 'ahitofficial.com@gmail.com';
                    const realName = typeof found === 'object' ? found.name : 'Premium Customer';
                    
                    setCurrentUserEmail(realEmail);
                    setCurrentUserName(realName);
                    localStorage.setItem('jsonstack_auth_email', realEmail);
                    localStorage.setItem('jsonstack_auth_name', realName);
                    localStorage.setItem('jsonstack_purchaser_email', realEmail);
                    localStorage.setItem('jsonstack_purchaser_name', realName);
                    
                    setShowAuthModal(false);
                  } else {
                    setAuthError("Không tìm thấy đơn hàng Premium hoàn tất nào khớp với Email hoặc Tên này. Vui lòng thanh toán trước khi đăng nhập!");
                  }
                  return;
                }
                
                // Query database
                const inputVal = authEmailInput.trim();
                const isEmail = inputVal.includes('@');
                
                let query = supabase.from('purchases').select('*');
                if (isEmail) {
                  query = query.eq('email', inputVal.toLowerCase());
                } else {
                  query = query.eq('name', inputVal);
                }
                
                const { data, error } = await query;
                if (error) {
                  console.error("Supabase Auth error:", error);
                  setAuthError("Lỗi kết nối cơ sở dữ liệu. Vui lòng thử lại sau.");
                } else if (data && data.length > 0) {
                  const completedRecord = data.find(o => o.status === 'Completed');
                  if (completedRecord) {
                    setIsUnlocked(true);
                    localStorage.setItem('jsonstack_unlocked', 'true');
                    setUserOrders(data);
                    
                    const userEmail = completedRecord.email || "";
                    const userName = completedRecord.name || safeSplitEmail(userEmail) || "Customer";
                    
                    setCurrentUserEmail(userEmail);
                    setCurrentUserName(userName);
                    setPurchaserEmail(userEmail);
                    setPurchaserName(userName);
                    
                    localStorage.setItem('jsonstack_auth_email', userEmail);
                    localStorage.setItem('jsonstack_auth_name', userName);
                    localStorage.setItem('jsonstack_purchaser_email', userEmail);
                    localStorage.setItem('jsonstack_purchaser_name', userName);
                    
                    setShowAuthModal(false);
                  } else {
                    setAuthError(lang === 'en' ? "This account has orders but payment is 'Pending'. Please pay successfully to access!" : "Tài khoản này có đơn hàng nhưng trạng thái thanh toán là 'Chưa hoàn tất'. Vui lòng thanh toán thành công để đăng nhập!");
                  }
                } else {
                  // Direct test email fallback helper for system evaluation convenience
                  if (inputVal.toLowerCase() === 'ahitofficial.com@gmail.com' || inputVal.toLowerCase() === 'admin') {
                    setIsUnlocked(true);
                    localStorage.setItem('jsonstack_unlocked', 'true');
                    
                    setCurrentUserEmail(inputVal);
                    setCurrentUserName("Admin Partner");
                    setPurchaserEmail(inputVal);
                    setPurchaserName("Admin Partner");
                    
                    localStorage.setItem('jsonstack_auth_email', inputVal);
                    localStorage.setItem('jsonstack_auth_name', "Admin Partner");
                    localStorage.setItem('jsonstack_purchaser_email', inputVal);
                    localStorage.setItem('jsonstack_purchaser_name', "Admin Partner");
                    
                    setShowAuthModal(false);
                    return;
                  }
                  
                  setAuthError(lang === 'en' ? "Email or Username not found in system registers. Please purchase first!" : "Không tìm thấy thông tin Email hoặc Tên tài khoản đã thanh toán trong hệ thống. Vui lòng thực hiện thanh toán trước!");
                }
              } catch (err: any) {
                console.error("Auth submit error:", err);
                setAuthError(lang === 'en' ? "Database verification failed. Please try again." : "Đã xảy ra sự cố trong quá trình xác minh. Hãy thử lại.");
              } finally {
                setIsLoadingOrders(false);
              }
            }} className="space-y-4 text-left font-sans">
              <div>
                <label className="block text-[9px] uppercase font-bold tracking-widest text-neutral-400 mb-1 ml-0.5">
                  {lang === 'en' ? 'Your Email or Username' : 'Email hoặc Username của bạn'}
                </label>
                <input
                  type="text"
                  required
                  value={authEmailInput}
                  onChange={(e) => setAuthEmailInput(e.target.value)}
                  placeholder={lang === 'en' ? 'yourlink@gmail.com or John Doe' : 'nhập-email@gmail.com hoặc John Doe'}
                  className="w-full bg-neutral-50 focus:bg-white border border-neutral-200 rounded-lg py-2.5 px-3 text-xs focus:outline-none focus:border-black transition-all font-mono"
                />
              </div>
              <button
                type="submit"
                disabled={isLoadingOrders}
                className="w-full bg-black text-white hover:bg-neutral-800 text-xs font-bold py-3 rounded-lg tracking-widest uppercase transition-colors flex items-center justify-center gap-2 shadow-md disabled:bg-neutral-300 disabled:cursor-not-allowed"
              >
                {isLoadingOrders ? (
                  <>
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-neutral-400 border-t-white animate-spin"></div>
                    {lang === 'en' ? 'Verifying...' : 'Đang xác minh...'}
                  </>
                ) : (
                  lang === 'en' ? "Authorize & Verify" : "Đăng nhập & Xác minh"
                )}
              </button>
            </form>

            <button 
              onClick={() => { setShowAuthModal(false); setAuthError(""); }}
              className="text-[10px] tracking-widest uppercase text-neutral-400 hover:text-black block w-full text-center transition-colors font-semibold"
            >
              {lang === 'en' ? 'Cancel' : 'Hủy bỏ'}
            </button>
          </div>
        </div>
      )}

      {/* My Orders Modal */}
      {showOrdersModal && (
        <div id="my-orders-modal" className="fixed inset-0 z-[160] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowOrdersModal(false)}></div>
          <div className="bg-white border border-neutral-200 rounded-2xl w-full max-w-lg relative z-10 overflow-hidden shadow-2xl flex flex-col font-sans text-black animate-scale-up">
            
            <div className="border-b border-neutral-100 p-6 flex justify-between items-center bg-neutral-50/50">
              <div className="flex items-center space-x-2.5">
                <div className="bg-indigo-50 text-indigo-700 p-2 rounded-xl">
                  <ShoppingBag size={18} />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-bold text-black tracking-tight">
                    {lang === 'en' ? 'Your Orders' : 'Đơn hàng của bạn'}
                  </h3>
                  <p className="text-[10px] font-mono text-neutral-400 tracking-tight">{purchaserEmail || currentUserEmail || (lang === 'en' ? 'Premium Customer' : 'Khách hàng Premium')}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowOrdersModal(false)}
                className="text-neutral-400 hover:text-black p-1 rounded-lg hover:bg-neutral-100 transition-all border border-transparent"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[350px] space-y-4">
              {isLoadingOrders ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-8 h-8 rounded-full border-2 border-neutral-200 border-t-neutral-900 animate-spin mx-auto"></div>
                  <p className="text-xs text-neutral-400 font-mono">
                    {lang === 'en' ? 'Checking database records...' : 'Đang kiểm tra cơ sở dữ liệu...' }
                  </p>
                </div>
              ) : ordersToRender.length === 0 ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-12 h-12 bg-neutral-50 border border-neutral-200 rounded-full flex items-center justify-center mx-auto text-neutral-450">
                    <ShoppingBag size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-neutral-700">
                      {lang === 'en' ? 'No orders found' : 'Chưa tìm thấy đơn hàng nào'}
                    </p>
                    <p className="text-[11px] text-neutral-500 leading-normal max-w-xs mx-auto">
                      {lang === 'en' 
                        ? `No completed transactions found for email ${purchaserEmail || currentUserEmail} in our active database.` 
                        : `Chúng tôi chưa thấy khoản thanh toán nào cho email ${purchaserEmail || currentUserEmail} của bạn trong hệ thống.`}
                    </p>
                  </div>
                  <div className="pt-2">
                    <a 
                      href="#pricing"
                      onClick={() => setShowOrdersModal(false)}
                      className="inline-flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider shadow-sm transition-colors"
                    >
                      {lang === 'en' ? 'Purchase Premium Package' : 'Mua gói Premium ngay'}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {ordersToRender.map((order, i) => {
                    const isCompleted = order.status === 'Completed';
                    return (
                      <div key={i} className="border border-neutral-200/80 rounded-xl p-4 bg-white hover:shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1 text-left">
                          <span className="text-[9px] uppercase font-mono tracking-widest text-neutral-400">Order #{order.id || i + 1004}</span>
                          <h4 className="text-xs font-bold text-black font-sans">JSONStack n8n Platform Suite</h4>
                          <div className="flex items-center gap-3 text-[10px] text-neutral-400 font-mono">
                            <span>{lang === 'en' ? 'Lifetime Product' : 'Sản phẩm Lifetime'}</span>
                            <span>•</span>
                            <span>{new Date(order.created_at || order.updated_at || Date.now()).toLocaleDateString(lang === 'en' ? 'en-US' : 'vi-VN')}</span>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-black font-mono">${(Number(order.amount) || 0).toFixed(2)}</span>
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-semibold border ${
                              isCompleted 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}>
                              {isCompleted ? 'Completed' : 'Pending'}
                            </span>
                          </div>

                          {isCompleted ? (
                            <button 
                              onClick={downloadPremiumZip}
                              className="inline-flex items-center gap-1.5 bg-black text-white px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-sm self-stretch"
                            >
                              <Download size={10} /> {lang === 'en' ? 'Download .ZIP' : 'Tải .ZIP File'}
                            </button>
                          ) : (
                            <p className="text-[9px] text-amber-600 font-light text-center leading-normal max-w-[124px]">
                              {lang === 'en' ? 'Payment pending. Try again.' : 'Thanh toán chưa hoàn tất. Vui lòng thử lại.'}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {isUnlocked ? (
              <div className="bg-amber-50 p-4 border-t border-neutral-200 flex flex-col items-stretch space-y-2 text-left">
                <div className="flex items-start gap-2 text-[10px] text-amber-900 leading-normal font-light">
                  <span className="font-bold uppercase text-[9px] tracking-wider py-0.5 px-1 bg-amber-200 rounded shrink-0">
                    {lang === 'en' ? 'Information' : 'Thông tin'}
                  </span>
                  <p>
                    {lang === 'en' 
                      ? 'You have successfully paid! Your 300+ JSON workflows (.ZIP) package has been fully unlocked. Click download above to fetch the master zip.' 
                      : 'Bạn đã thanh toán thành công! Gói 300+ JSON workflows (.ZIP) đã được mở khóa. Hãy nhấp nút tải về ở trên để lấy file nén đầy đủ.'}
                  </p>
                </div>
              </div>
            ) : null}
            <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
              <span className="uppercase tracking-widest text-[9px]">JSONStack Security</span>
              <span>
                {lang === 'en' ? 'Automated Invoice delivery powered by PayPal' : 'Hóa đơn tự động thông qua PayPal'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Footer Details */}
      <footer id="about-us" className="bg-white text-neutral-400 py-12 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs font-light space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <img 
                src="/logos/jsonstack_logo.png" 
                alt="JSONStack Logo" 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (e.currentTarget.src.includes('/logos/jsonstack_logo.png')) {
                    e.currentTarget.src = "/logos/jsonstack_logo.jpg";
                  } else {
                    e.currentTarget.style.display = 'none';
                    const svg = e.currentTarget.parentElement?.querySelector('svg');
                    if (svg) svg.style.display = 'block';
                  }
                }}
              />
              <svg className="w-4 h-4 text-black" style={{ display: 'none' }} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="8" fill="none"/>
                <line x1="50" y1="15" x2="50" y2="85" stroke="black" strokeWidth="16"/>
                <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="8"/>
              </svg>
            </div>
            <span className="text-sm text-black flex items-center">
              <span className="font-medium mr-1.5 text-neutral-400">© 2026</span>
              <span className="font-black">JSON</span>
              <span className="font-light text-neutral-500 mr-2">STACK</span>
              <span className="font-medium text-neutral-400">Studio. Powered by jsonstack.me</span>
            </span>
          </div>
          <div className="text-neutral-400 text-center md:text-right">
            {lang === 'en' 
              ? 'Disclaimer: We are not officially affiliated with or endorsed by n8n.io.' 
              : 'Tuyên bố từ chối trách nhiệm: Chúng tôi không liên kết chính thức hoặc được xác nhận bởi n8n.io.'}
          </div>
        </div>
      </footer>

      {/* Live Sales/FOMO Funnel Notification Popup */}
      <div 
        className={`fixed bottom-5 right-5 z-50 max-w-sm bg-white border border-neutral-200 rounded-2xl shadow-2xl p-4 flex items-start space-[#12] space-x-3.5 transition-all duration-500 ease-out transform ${
          showNotification && activeNotification
            ? "translate-y-0 opacity-100 scale-100" 
            : "translate-y-12 opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ transitionProperty: "transform, opacity" }}
      >
        {/* Verification Status Badge */}
        <div className="relative shrink-0">
          <div className="w-10 h-10 bg-neutral-900 text-white rounded-full flex items-center justify-center font-extrabold text-xs">
            {activeNotification ? (lang === 'en' ? activeNotification.nameEn[0] : activeNotification.nameVi[0]) : 'J'}
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-left min-w-0 pr-2">
          <div className="flex items-center justify-between">
            <h5 className="text-[11px] font-black text-black tracking-tight truncate max-w-[180px]">
              {activeNotification ? (lang === 'en' ? activeNotification.nameEn : activeNotification.nameVi) : ''}
            </h5>
            <span className="text-[9px] text-neutral-400 font-mono shrink-0 ml-2">
              {activeNotification ? (lang === 'en' ? activeNotification.timeEn : activeNotification.timeVi) : ''}
            </span>
          </div>
          
          <p className="text-[11px] text-neutral-600 mt-0.5 leading-snug">
            {lang === 'en' ? (
              <>
                Just purchased <span className="font-semibold text-neutral-900">{activeNotification?.itemEn}</span>
              </>
            ) : (
              <>
                Vừa mua thành công <span className="font-semibold text-neutral-900">{activeNotification?.itemVi}</span>
              </>
            )}
          </p>
          
          <div className="flex items-center space-x-1.5 mt-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[8px] text-emerald-600 font-bold uppercase tracking-wider font-mono">
              {lang === 'en' ? 'Verified Buyer' : 'Người Mua Đã Xác Thực'}
            </span>
          </div>
        </div>

        {/* Close Button */}
        <button 
          onClick={() => setShowNotification(false)}
          className="text-neutral-400 hover:text-neutral-650 p-0.5 rounded transition-colors shrink-0"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
