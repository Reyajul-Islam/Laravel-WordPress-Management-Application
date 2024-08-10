import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, router } from '@inertiajs/react';

export default function Index({ auth, className = '' }) {
  const { connected_ssh, sites } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this site?')) {
            router.delete(route('wordpress-sites.destroy', id), {
                onSuccess: () => {
                    alert('WordPress site deleted successfully.');
                },
            });
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">WordPress Directories {connected_ssh && (
              <span className="text-green-400"> (connected - {connected_ssh})</span>
          )}</h2>}
        >
            <Head title="WordPress Directories" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                      <section className={className}>
                        <header>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 float-left">WordPress Directories</h2>
                            <Link href={`/wordpress-sites/create`} className={`mx-1 px-3 py-1 border bg-blue-500 text-white float-right mb-2`}>Add New Path</Link>
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
                                            <Link
                                                key={index}
                                                href={`/wordpress-sites/${site.id}/edit`}
                                                className={`mx-1 px-3 py-1 border bg-yellow-500 text-white`}
                                                dangerouslySetInnerHTML={{ __html: 'Edit' }}
                                            />
                                            <button
                                                onClick={() => handleDelete(site.id)}
                                                className="mx-1 px-3 py-1 border bg-red-500 text-white"
                                            >
                                                Delete
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
                      </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
