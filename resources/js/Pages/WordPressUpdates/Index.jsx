import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { usePage, router, Link, Head } from '@inertiajs/react';

export default function Index({ auth, className = '' }) {
    const { sites } = usePage().props;
    const [output, setOutput] = useState('');
    const [selectedSite, setSelectedSite] = useState(null);

    const checkUpdates = (id) => {
        router.post('/wordpress-updates/check', { id }, {
            onSuccess: ({ props }) => {
                setOutput(props.output);
            }
        });
    };

    const applyUpdates = (id) => {
        router.post('/wordpress-updates/apply', { id }, {
            onSuccess: ({ props }) => {
                setOutput(props.output);
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Check Plugin Updates</h2>}
        >
            <Head title="Check Plugin Updates" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <section className={className}>
                        <header>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Check Plugin Updates</h2>
                        </header>


                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border">SL No</th>
                                    <th className="py-2 px-4 border">Directory Path</th>
                                    <th className="py-2 px-4 border" style={{ width: '150px' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sites.data.map((site, index) => (
                                    <tr key={site.id}>
                                        <td className="py-2 px-4 border">{index + 1}</td>
                                        <td className="py-2 px-4 border">{site.path}</td>
                                        <td className="border">
                                            <button
                                             onClick={() => { setSelectedSite(site.id); checkUpdates(site.id); }}
                                             className={`mx-1 px-3 py-1 border bg-blue-500 text-white`}
                                             >
                                                Check Updates
                                            </button>
                                            <button 
                                            onClick={() => applyUpdates(site.id)}
                                            className={`mx-1 px-3 py-1 border bg-green-500 text-white`}
                                            >
                                                Apply Updates
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Links */}
                        <div className="mt-4">
                            {sites.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`mx-1 px-3 py-1 border ${link.active ? 'bg-blue-500 text-white' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>


                        {output && (
                            <div>
                                <h2>Output</h2>
                                <pre>{output}</pre>
                            </div>
                        )}


                    </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
