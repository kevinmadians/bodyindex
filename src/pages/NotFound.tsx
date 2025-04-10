import React from 'react';
import Layout from '@/components/Layout';
import usePageTitle from '@/hooks/usePageTitle';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const NotFound = () => {
  usePageTitle('Page Not Found - Body Index');

  return (
    <Layout>
      <SEO 
        title="Page Not Found - Body Index"
        description="The page you are looking for does not exist. Return to the Body Index homepage for health and fitness calculators."
        keywords="404, page not found, error page, body index"
        canonical="https://bodyindex.net/404"
      />
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button size="lg">Return to Homepage</Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
