import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ThemeProvider } from '@/context/ThemeContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Home from '@/pages/Home';
import ProductDetail from '@/pages/ProductDetail';
import Categories from '@/pages/Categories';
import Deals from '@/pages/Deals';
import Wishlist from '@/pages/Wishlist';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Terms from '@/pages/Terms';
import AffiliateDisclosure from '@/pages/AffiliateDisclosure';
import ShippingPolicy from '@/pages/ShippingPolicy';
import ReturnPolicy from '@/pages/ReturnPolicy';
import Faq from '@/pages/Faq';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Compare from '@/pages/Compare';
import NotFound from '@/pages/NotFound';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminProductForm from '@/pages/admin/AdminProductForm';
import AdminMessages from '@/pages/admin/AdminMessages';
import AdminAnalytics from '@/pages/admin/AdminAnalytics';
import AdminComplaints from '@/pages/admin/AdminComplaints';
import AdminAILogs from '@/pages/admin/AdminAILogs';
import ComplaintCenter from '@/pages/ComplaintCenter';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <WishlistProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="categories" element={<Categories />} />
              <Route path="deals" element={<Deals />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="complain" element={<ComplaintCenter />} />
              <Route path="terms" element={<Terms />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="affiliate-disclosure" element={<AffiliateDisclosure />} />
              <Route path="shipping-policy" element={<ShippingPolicy />} />
              <Route path="return-policy" element={<ReturnPolicy />} />
              <Route path="faq" element={<Faq />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="compare" element={<Compare />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="admin/login" element={<AdminLogin />} />
            <Route element={<ProtectedRoute />}>
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="admin/settings" element={<AdminSettings />} />
              <Route path="admin/products" element={<AdminProducts />} />
              <Route path="admin/products/new" element={<AdminProductForm />} />
              <Route path="admin/products/:id/edit" element={<AdminProductForm />} />
              <Route path="admin/analytics" element={<AdminAnalytics />} />
              <Route path="admin/messages" element={<AdminMessages />} />
              <Route path="admin/complaints" element={<AdminComplaints />} />
              <Route path="admin/ai-logs" element={<AdminAILogs />} />
            </Route>
          </Routes>
        </WishlistProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
