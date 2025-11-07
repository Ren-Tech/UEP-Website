import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, BookOpen, Users, Globe, Award, Microscope, Leaf, Upload, Lock, Download, FileText, CheckCircle, Eye, Database, Server, Search } from 'lucide-react';
import { ChevronLeft, Play, Pause } from 'lucide-react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Clock, Send, Image } from "lucide-react";
import { ChevronDown, ExternalLink, User } from 'lucide-react';

// ==================== Database Simulation ====================
class SDGDatabase {
  constructor() {
    this.storageKey = 'uep_sdg_database';
    this.initDatabase();
  }

  initDatabase() {
    if (!localStorage.getItem(this.storageKey)) {
      const initialData = {
        documents: [
          {
            id: 1,
            title: "UEP Sustainability Report 2024",
            description: "Comprehensive report on UEP's sustainability initiatives and achievements across all SDG goals",
            fileName: "uep-sustainability-report-2024.pdf",
            fileSize: "2.45",
            uploadDate: "2024-03-15",
            fileType: "application/pdf",
            fileUrl: "#",
            lastModified: new Date().toISOString(),
            category: "sustainability",
            tags: ["report", "sustainability", "2024", "annual"]
          },
          {
            id: 2,
            title: "Green Campus Initiative Plan",
            description: "Detailed implementation plan for green initiatives across UEP campuses",
            fileName: "green-campus-initiative.docx",
            fileSize: "1.23",
            uploadDate: "2024-03-10",
            fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            fileUrl: "#",
            lastModified: new Date().toISOString(),
            category: "environment",
            tags: ["initiative", "campus", "environment", "green"]
          },
          {
            id: 3,
            title: "Climate Action Research Paper",
            description: "Research findings on climate change mitigation strategies in educational institutions",
            fileName: "climate-action-research.pdf",
            fileSize: "3.12",
            uploadDate: "2024-03-05",
            fileType: "application/pdf",
            fileUrl: "#",
            lastModified: new Date().toISOString(),
            category: "research",
            tags: ["research", "climate", "environment", "paper"]
          }
        ],
        categories: ["sustainability", "environment", "research", "community", "education"],
        nextId: 4
      };
      this.saveData(initialData);
    }
  }

  getData() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  saveData(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  async getAllDocuments() {
    const data = this.getData();
    return data.documents;
  }

  async getDocumentById(id) {
    const data = this.getData();
    return data.documents.find(doc => doc.id === id);
  }

  async addDocument(document) {
    const data = this.getData();
    const newDocument = {
      ...document,
      id: data.nextId++,
      uploadDate: new Date().toLocaleDateString(),
      lastModified: new Date().toISOString()
    };
    data.documents.unshift(newDocument);
    this.saveData(data);
    return newDocument;
  }

  async updateDocument(id, updates) {
    const data = this.getData();
    const documentIndex = data.documents.findIndex(doc => doc.id === id);
    if (documentIndex !== -1) {
      data.documents[documentIndex] = {
        ...data.documents[documentIndex],
        ...updates,
        lastModified: new Date().toISOString()
      };
      this.saveData(data);
      return data.documents[documentIndex];
    }
    return null;
  }

  async deleteDocument(id) {
    const data = this.getData();
    data.documents = data.documents.filter(doc => doc.id !== id);
    this.saveData(data);
    return true;
  }

  async searchDocuments(query) {
    const documents = await this.getAllDocuments();
    return documents.filter(doc => 
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.description.toLowerCase().includes(query.toLowerCase()) ||
      (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
    );
  }

  async getDocumentsByCategory(category) {
    const documents = await this.getAllDocuments();
    return documents.filter(doc => doc.category === category);
  }

  async backupData() {
    const data = this.getData();
    const backup = {
      ...data,
      backupDate: new Date().toISOString()
    };
    localStorage.setItem(`${this.storageKey}_backup`, JSON.stringify(backup));
    return backup;
  }

  async restoreBackup() {
    const backup = localStorage.getItem(`${this.storageKey}_backup`);
    if (backup) {
      localStorage.setItem(this.storageKey, backup);
      return true;
    }
    return false;
  }

  async getStatistics() {
    const documents = await this.getAllDocuments();
    const totalSize = documents.reduce((sum, doc) => sum + parseFloat(doc.fileSize), 0);
    const categories = {};
    
    documents.forEach(doc => {
      categories[doc.category] = (categories[doc.category] || 0) + 1;
    });

    return {
      totalDocuments: documents.length,
      totalSize: totalSize.toFixed(2),
      categories,
      lastUpdated: new Date().toISOString()
    };
  }
}

const sdgDatabase = new SDGDatabase();

// ==================== Onboarding Animation ====================
const OnboardingAnimation = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const steps = [
    { icon: BookOpen, text: "Welcome to UEP", subtext: "Excellence in Education" },
    { icon: Users, text: "Join Our Community", subtext: "Connect & Grow Together" },
    { icon: Globe, text: "Global Opportunities", subtext: "Expand Your Horizons" },
    { icon: Award, text: "Achieve Excellence", subtext: "Unlock Your Potential" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 500);
        }, 1500);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [currentStep, steps.length, onComplete]);

  if (!isVisible) return null;

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-700 z-50 flex items-center justify-center" style={{background: 'linear-gradient(135deg, #800000 0%, #a0002a 50%, #7a0029 100%)'}}>
      <div className="text-center text-white transform transition-all duration-500">
        <div className="mb-8 transform animate-bounce">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 inline-block">
            <CurrentIcon size={80} className="mx-auto text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
          {steps[currentStep].text}
        </h1>
        <p className="text-xl md:text-2xl text-rose-100 animate-fade-in-delayed">
          {steps[currentStep].subtext}
        </p>
        <div className="flex justify-center mt-8 space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                index <= currentStep ? 'bg-white shadow-lg' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== Admin Login Modal ====================
const AdminLoginModal = ({ isOpen, onClose, onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      onLogin();
      onClose();
    } else {
      alert('Invalid credentials! Try admin/admin123');
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Admin Login</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter username"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter password"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <Lock size={20} className="mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Demo credentials: <br />
              <strong>Username:</strong> admin <br />
              <strong>Password:</strong> admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== Admin Upload Modal ====================
const AdminUploadModal = ({ isOpen, onClose, onUpload }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const categories = ["sustainability", "environment", "research", "community", "education"];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!title) {
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) return;
    
    setIsUploading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newSDG = {
      title,
      description,
      fileName: file.name,
      fileSize: (file.size / 1024 / 1024).toFixed(2),
      fileUrl: URL.createObjectURL(file),
      fileType: file.type,
      category: category || 'sustainability',
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    
    onUpload(newSDG);
    setIsUploading(false);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFile(null);
    setTitle('');
    setDescription('');
    setCategory('');
    setTags('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full transform transition-all duration-300 scale-100">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Upload SDG Document</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter document title"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Enter document description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                  placeholder="tag1, tag2, tag3"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-red-400 transition-colors">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    {file ? file.name : 'Click to upload document'}
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF, DOC, DOCX, PPT, PPTX, Images (Max 10MB)
                  </p>
                </label>
              </div>
              {file && (
                <div className="mt-2 flex items-center text-green-600">
                  <CheckCircle size={16} className="mr-2" />
                  <span className="text-sm">File selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-4 px-6 rounded-xl transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!file || !title || isUploading}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isUploading ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={20} className="mr-2" />
                    Upload Document
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// ==================== File Viewer Modal ====================
const FileViewerModal = ({ isOpen, onClose, document }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && document) {
      setIsLoading(true);
      setError(null);
      const timer = setTimeout(() => {
        setIsLoading(false);
        if (document.fileUrl === '#') {
          setError('File preview not available for this document.');
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, document]);

  if (!isOpen || !document) return null;

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word')) return '📝';
    if (fileType.includes('excel')) return '📊';
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('video')) return '🎬';
    return '📎';
  };

  const getFileTypeName = (fileType) => {
    if (fileType.includes('pdf')) return 'PDF Document';
    if (fileType.includes('word')) return 'Word Document';
    if (fileType.includes('excel')) return 'Excel Spreadsheet';
    if (fileType.includes('image')) return 'Image File';
    if (fileType.includes('video')) return 'Video File';
    return 'Document';
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
              <span className="text-lg">{getFileIcon(document.fileType)}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{document.title}</h3>
              <p className="text-sm text-gray-500">{getFileTypeName(document.fileType)} • {document.fileSize} MB</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Loading document preview...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Preview Not Available</h4>
              <p className="text-gray-600 mb-6">{error}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => window.open(document.fileUrl, '_blank')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center"
                >
                  <Download size={16} className="mr-2" />
                  Download File
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Document Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Title:</span>
                    <p className="font-medium">{document.title}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">File Size:</span>
                    <p className="font-medium">{document.fileSize} MB</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Upload Date:</span>
                    <p className="font-medium">{document.uploadDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">File Type:</span>
                    <p className="font-medium">{getFileTypeName(document.fileType)}</p>
                  </div>
                  {document.category && (
                    <div className="col-span-2">
                      <span className="text-gray-600">Category:</span>
                      <p className="font-medium capitalize">{document.category}</p>
                    </div>
                  )}
                </div>
              </div>

              {document.description && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-700 bg-gray-50 rounded-lg p-4">{document.description}</p>
                </div>
              )}

              {document.tags && document.tags.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">File preview would be displayed here</p>
                <p className="text-sm text-gray-500">
                  Supported formats: PDF, Images, Documents
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            Last modified: {new Date(document.lastModified).toLocaleDateString()}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => window.open(document.fileUrl, '_blank')}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <Download size={16} />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <X size={16} />
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== Database Management ====================
const DatabaseManagement = ({ isOpen, onClose, documents, onDataChange }) => {
  const [statistics, setStatistics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [backupStatus, setBackupStatus] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadStatistics();
    }
  }, [isOpen]);

  const loadStatistics = async () => {
    setIsLoading(true);
    try {
      const stats = await sdgDatabase.getStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
    setIsLoading(false);
  };

  const handleBackup = async () => {
    setIsLoading(true);
    setBackupStatus('Creating backup...');
    try {
      await sdgDatabase.backupData();
      setBackupStatus('Backup created successfully!');
      setTimeout(() => setBackupStatus(''), 3000);
    } catch (error) {
      setBackupStatus('Backup failed!');
      console.error('Backup error:', error);
    }
    setIsLoading(false);
  };

  const handleRestore = async () => {
    if (window.confirm('Are you sure you want to restore from backup? This will replace current data.')) {
      setIsLoading(true);
      setBackupStatus('Restoring from backup...');
      try {
        const success = await sdgDatabase.restoreBackup();
        if (success) {
          setBackupStatus('Restore completed successfully!');
          onDataChange();
          setTimeout(() => {
            setBackupStatus('');
            onClose();
          }, 2000);
        } else {
          setBackupStatus('No backup found!');
        }
      } catch (error) {
        setBackupStatus('Restore failed!');
        console.error('Restore error:', error);
      }
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    const data = sdgDatabase.getData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uep-sdg-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full transform transition-all duration-300 scale-100">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Database className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">Database Management</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
              <span className="text-gray-600">Processing...</span>
            </div>
          ) : (
            <div className="space-y-6">
              {statistics && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Database Statistics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{statistics.totalDocuments}</div>
                      <div className="text-sm text-gray-600">Documents</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{statistics.totalSize}</div>
                      <div className="text-sm text-gray-600">MB Total</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {Object.keys(statistics.categories).length}
                      </div>
                      <div className="text-sm text-gray-600">Categories</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">
                        {new Date(statistics.lastUpdated).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-600">Last Updated</div>
                    </div>
                  </div>
                </div>
              )}

              {statistics && statistics.categories && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Documents by Category</h4>
                  <div className="space-y-2">
                    {Object.entries(statistics.categories).map(([category, count]) => (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 capitalize">{category}</span>
                        <span className="font-semibold">{count} documents</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {backupStatus && (
                <div className={`p-3 rounded-lg text-center ${
                  backupStatus.includes('failed') 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  {backupStatus}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <button
                  onClick={handleBackup}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
                >
                  <Database size={16} className="mr-2" />
                  Backup Data
                </button>
                <button
                  onClick={handleRestore}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
                >
                  <Server size={16} className="mr-2" />
                  Restore Backup
                </button>
                <button
                  onClick={handleExport}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Download size={16} className="mr-2" />
                  Export Data
                </button>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> This is a simulated database using browser localStorage. 
                  In a production environment, this would connect to a real database server.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== Enhanced Document Management ====================
const DocumentManagement = ({ sdgDocuments, isAdmin, onDeleteDocument, onEditDocument, onViewDocument }) => {
  const [editingDoc, setEditingDoc] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', category: '', tags: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(sdgDocuments.map(doc => doc.category).filter(Boolean))];

  const filteredDocuments = sdgDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (doc) => {
    setEditingDoc(doc.id);
    setEditForm({ 
      title: doc.title, 
      description: doc.description,
      category: doc.category || '',
      tags: doc.tags ? doc.tags.join(', ') : ''
    });
  };

  const handleSaveEdit = () => {
    const updates = {
      ...editForm,
      tags: editForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    onEditDocument(editingDoc, updates);
    setEditingDoc(null);
    setEditForm({ title: '', description: '', category: '', tags: '' });
  };

  const handleCancelEdit = () => {
    setEditingDoc(null);
    setEditForm({ title: '', description: '', category: '', tags: '' });
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h4 className="text-xl font-bold text-gray-900 mb-4 md:mb-0">Document Management</h4>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <div key={doc.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-colors">
              {editingDoc === doc.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="Document title"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                    placeholder="Document description"
                    rows="3"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={editForm.category}
                      onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      placeholder="Category"
                    />
                    <input
                      type="text"
                      value={editForm.tags}
                      onChange={(e) => setEditForm({...editForm, tags: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      placeholder="Tags (comma separated)"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mt-1">
                        {doc.fileName.split('.').pop()?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">{doc.title}</h5>
                        <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>Size: {doc.fileSize} MB</span>
                          <span>Type: {doc.fileName.split('.').pop()?.toUpperCase()}</span>
                          <span>Uploaded: {doc.uploadDate}</span>
                          {doc.category && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                              {doc.category}
                            </span>
                          )}
                        </div>
                        {doc.tags && doc.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {doc.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onViewDocument(doc)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center"
                    >
                      <Eye size={14} className="mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(doc)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteDocument(doc.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No documents found matching your criteria.
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-600">
        Showing {filteredDocuments.length} of {sdgDocuments.length} documents
        {selectedCategory !== 'all' && ` in category "${selectedCategory}"`}
        {searchQuery && ` matching "${searchQuery}"`}
      </div>
    </div>
  );
};

// ==================== Navbar ====================
const Navbar = ({ isAdmin, onAdminChange, currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      name: 'HOME', 
      href: '#home',
      page: 'home',
      submenu: [
        { name: 'Campus News', href: '#news', page: 'news' },
        { name: 'Events', href: '#events', page: 'events' },
        { name: 'Announcements', href: '#announcements', page: 'announcements' }
      ]
    },
    { 
      name: 'PROGRAMS', 
      href: '#programs',
      page: 'programs',
      submenu: [
        { name: 'Undergraduate', href: '#undergraduate', page: 'undergraduate' },
        { name: 'Graduate', href: '#graduate', page: 'graduate' },
        { name: 'Online Programs', href: '#online', page: 'online' }
      ]
    },
    { 
      name: 'STUDENT LIFE', 
      href: '#student-life',
      page: 'student-life',
      submenu: [
        { name: 'Campus Facilities', href: '#facilities', page: 'facilities' },
        { name: 'Student Organizations', href: '#organizations', page: 'organizations' },
        { name: 'Housing', href: '#housing', page: 'housing' }
      ]
    },
    { 
      name: 'GLOBAL', 
      href: '#global',
      page: 'global',
      submenu: [
        { name: 'International Programs', href: '#international', page: 'international' },
        { name: 'Study Abroad', href: '#study-abroad', page: 'study-abroad' },
        { name: 'Global Partnerships', href: '#partnerships', page: 'partnerships' }
      ]
    },
    { 
      name: 'ALUMNI', 
      href: '#alumni',
      page: 'alumni',
      submenu: [
        { name: 'Alumni Network', href: '#network', page: 'network' },
        { name: 'Events', href: '#alumni-events', page: 'alumni-events' },
        { name: 'Give Back', href: '#give-back', page: 'give-back' }
      ]
    },
    { 
      name: 'RESEARCH', 
      href: '#research',
      page: 'research',
      submenu: [
        { name: 'Research Centers', href: '#centers', page: 'centers' },
        { name: 'Publications', href: '#publications', page: 'publications' },
        { name: 'Grants', href: '#grants', page: 'grants' }
      ]
    },
    { 
      name: 'SUSTAINABILITY', 
      href: '#sustainability',
      page: 'sustainability',
      submenu: [
        { name: 'Green Initiatives', href: '#initiatives', page: 'initiatives' },
        { name: 'Sustainability Report', href: '#report', page: 'report' },
        { name: 'Get Involved', href: '#involved', page: 'involved' }
      ]
    },
    { 
      name: 'ABOUT UEP', 
      href: '#about',
      page: 'about',
      submenu: [
        { name: 'History', href: '#history', page: 'history' },
        { name: 'Leadership', href: '#leadership', page: 'leadership' },
        { name: 'Visit Campus', href: '#visit', page: 'visit' }
      ]
    },
  ];

  const handleNavigation = (page) => {
    onPageChange(page);
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <div className={`w-full z-50 fixed top-0 transition-all duration-500 ${isScrolled ? 'bg-gradient-to-br from-red-900 via-red-800 to-red-700 shadow-xl' : 'bg-gradient-to-br from-red-900 via-red-800 to-red-700'}`}>
      <div className="hidden md:block bg-red-800/80 text-white py-2 border-b border-red-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Mail size={12} />
                <span className="hover:text-red-200 transition-colors cursor-pointer">info@uep.edu.com</span>
              </div>
              <div className="hidden lg:flex items-center space-x-2 hover:text-red-200 transition-colors cursor-pointer">
                <User size={12} />
                <span>Student Portal</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-3">
                <div className="flex items-center space-x-1 hover:text-red-200 transition-colors cursor-pointer">
                  <Phone size={12} />
                  <span>Binalonan: 0927 440 8826</span>
                </div>
                <div className="flex items-center space-x-1 hover:text-red-200 transition-colors cursor-pointer">
                  <Phone size={12} />
                  <span>North Manila: 0917 112 8724</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Search size={14} className="cursor-pointer hover:text-red-200 transition-colors" />
                <div className="h-3 w-px bg-red-600"></div>
                <button 
                  onClick={() => handleNavigation('apply')}
                  className="text-xs bg-red-700 hover:bg-red-600 px-2 py-1 rounded transition-colors"
                >
                  Apply
                </button>
                {isAdmin ? (
                  <button 
                    onClick={() => onAdminChange(false)}
                    className="text-xs bg-green-600 hover:bg-green-700 px-2 py-1 rounded transition-colors flex items-center"
                  >
                    <Lock size={12} className="mr-1" />
                    Admin
                  </button>
                ) : (
                  <button 
                    onClick={() => setShowAdminLogin(true)}
                    className="text-xs bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded transition-colors flex items-center"
                  >
                    <Lock size={12} className="mr-1" />
                    Admin Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="py-3 bg-gradient-to-br from-red-900 via-red-800 to-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0 flex items-center">
              <div 
                className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer"
                onClick={() => handleNavigation('home')}
              >
                <div className="bg-red-700/80 text-white p-2 sm:p-3 rounded-lg shadow-lg group-hover:scale-105 transition-transform">
                  <BookOpen className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div className="hidden sm:block">
                  <div className="font-bold text-sm sm:text-base lg:text-lg text-white">University of Eastern Pangasinan</div>
                  <div className="text-xs text-red-200 hidden md:block">Excellence • Integrity • Service</div>
                </div>
              </div>
            </div>

            <div className="hidden xl:flex items-center space-x-1">
              {navItems.map((item) => (
                <div 
                  key={item.name} 
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleNavigation(item.page)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg transition-all duration-300 flex items-center whitespace-nowrap ${
                      currentPage === item.page && item.page !== 'home'
                        ? 'bg-white text-red-800' 
                        : 'text-white hover:bg-red-700/50'
                    }`}
                  >
                    {item.name}
                    {item.submenu && <ChevronDown size={14} className="ml-1" />}
                  </button>
                  
                  {item.submenu && activeDropdown === item.name && (
                    <div className="absolute left-0 mt-1 w-56 bg-red-800/95 backdrop-blur-sm border border-red-700/50 rounded-lg shadow-xl z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="py-2">
                        {item.submenu.map((subItem) => (
                          <button
                            key={subItem.name}
                            onClick={() => handleNavigation(subItem.page)}
                            className="block w-full text-left px-4 py-2 text-sm text-red-100 hover:bg-red-700/50 hover:text-white transition-colors flex items-center justify-between"
                          >
                            {subItem.name}
                            <ExternalLink size={14} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <button
    onClick={() => window.open('https://uepcollege.acctech.ph/', '_blank')}
    // OR onClick={() => window.location.href = 'https://uepcollege.acctech.ph/'}
    className="ml-3 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg text-xs uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center whitespace-nowrap"
>
    Enroll Now
    <ExternalLink size={14} className="ml-2" />
</button>
            </div>

            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-red-700/80 inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-white/20 shadow-lg transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="xl:hidden mt-2 mx-4 max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="bg-red-800/95 backdrop-blur-sm border border-red-700/50 rounded-xl shadow-xl overflow-hidden">
              <div className="px-4 pt-4 pb-6 space-y-1">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <button
                      className={`w-full text-left px-4 py-3 text-sm font-medium uppercase tracking-wide transition-all duration-300 rounded-lg flex items-center justify-between ${
                        currentPage === item.page && item.page !== 'home'
                          ? 'bg-red-700 text-white'
                          : 'text-red-100 hover:text-white hover:bg-red-700/50'
                      }`}
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    >
                      {item.name}
                      {item.submenu && <ChevronDown size={16} className={`transform transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                    </button>
                    
                    {item.submenu && activeDropdown === item.name && (
                      <div className="pl-6 pb-2 space-y-2 mt-2">
                        {item.submenu.map((subItem) => (
                          <button
                            key={subItem.name}
                            onClick={() => handleNavigation(subItem.page)}
                            className={`block w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                              currentPage === subItem.page
                                ? 'bg-red-600 text-white'
                                : 'text-red-200 hover:text-white hover:bg-red-700/50'
                            }`}
                          >
                            {subItem.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t border-red-700/50">
                  <button 
                    onClick={() => handleNavigation('enroll')}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg uppercase tracking-wide transition-all duration-300 flex items-center justify-center"
                  >
                    Enroll Now
                    <ExternalLink size={16} className="ml-2" />
                  </button>
                </div>
                <div className="pt-4 border-t border-red-700/50">
                  {isAdmin ? (
                    <button 
                      onClick={() => onAdminChange(false)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg uppercase tracking-wide transition-all duration-300 flex items-center justify-center"
                    >
                      <Lock size={16} className="mr-2" />
                      Admin Panel
                    </button>
                  ) : (
                    <button 
                      onClick={() => setShowAdminLogin(true)}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg uppercase tracking-wide transition-all duration-300 flex items-center justify-center"
                    >
                      <Lock size={16} className="mr-2" />
                      Admin Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      <AdminLoginModal
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLogin={() => onAdminChange(true)}
      />
    </div>
  );
};

// ==================== Hero Section ====================
const HeroSection = ({ onExplorePrograms, onVirtualTour }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 text-white overflow-hidden pt-24">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-red-500/10 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-red-600/10 rounded-full animate-pulse-medium"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-red-400/10 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/5 rounded-full animate-pulse-medium"></div>
      </div>

      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${15 + Math.random() * 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center">
        <div className="text-center w-full">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 text-red-200 text-sm font-semibold mb-6 border border-white/10">
            <MapPin className="w-4 h-4 mr-2" />
            Premier Education Destination
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-red-200">
            Shape Your Future at
            <span className="block mt-2">
              University of Excellence
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-red-100 max-w-4xl mx-auto leading-relaxed">
            Discover world-class education, groundbreaking research, and limitless opportunities 
            in our vibrant academic community where innovation meets tradition.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={onExplorePrograms}
              className="group bg-white text-red-900 font-bold py-4 px-8 rounded-full hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-2"
            >
              <span>Explore Programs</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onVirtualTour}
              className="group border-2 border-white/50 text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 transform hover:scale-105 backdrop-blur-sm flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Virtual Tour</span>
            </button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '15K+', label: 'Students', onClick: () => alert('Learn more about our student community!') },
              { number: '200+', label: 'Faculty', onClick: () => alert('Meet our distinguished faculty members!') },
              { number: '50+', label: 'Programs', onClick: onExplorePrograms },
              { number: '95%', label: 'Employment Rate', onClick: () => alert('Discover our career placement success!') }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/10 cursor-pointer"
                onClick={stat.onClick}
              >
                <div className="text-3xl font-bold text-white">{stat.number}</div>
                <div className="text-red-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-900 via-red-900/80 to-transparent"></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.05);
          }
        }
        @keyframes pulse-medium {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.03);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
        .animate-pulse-medium {
          animation: pulse-medium 6s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

// ==================== Image Carousel ====================
const ImageCarousel = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=600&fit=crop",
      title: "State-of-the-Art Campus",
      description: "Modern facilities designed for the future of education"
    },
    {
      src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop", 
      title: "Collaborative Learning",
      description: "Students working together in innovative spaces"
    },
    {
      src: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=600&fit=crop",
      title: "Research Excellence",
      description: "Cutting-edge laboratories and research facilities"
    },
    {
      src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=600&fit=crop",
      title: "Campus Life", 
      description: "Vibrant student community and activities"
    },
    {
      src: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200&h=600&fit=crop",
      title: "Global Opportunities",
      description: "International partnerships and study abroad programs"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length, isPlaying]);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto h-[600px] overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
              index === current 
                ? "opacity-100 scale-100" 
                : index === (current - 1 + images.length) % images.length
                ? "opacity-0 scale-110 -translate-x-full"
                : "opacity-0 scale-95 translate-x-full"
            }`}
          >
            <img 
              src={img.src} 
              alt={img.title} 
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className={`absolute bottom-0 left-0 right-0 p-8 text-white transform transition-all duration-700 ${
              index === current ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}>
              <h3 className="text-3xl font-bold mb-2 drop-shadow-lg">{img.title}</h3>
              <p className="text-lg text-gray-200 drop-shadow-md">{img.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className={`absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 ${
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
        } hover:scale-110 active:scale-95`}
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className={`absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 ${
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
        } hover:scale-110 active:scale-95`}
      >
        <ChevronRight size={24} />
      </button>

      <button
        onClick={togglePlayPause}
        className={`absolute top-6 right-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 ${
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
        } hover:scale-110 active:scale-95`}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
          >
            <div className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
              index === current 
                ? "border-white bg-white/20 backdrop-blur-sm scale-110" 
                : "border-white/50 hover:border-white/80 hover:scale-105"
            }`}>
              {index === current && (
                <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse" />
              )}
            </div>
            
            <img 
              src={images[index].src}
              alt={`Thumbnail ${index}`}
              className={`absolute inset-1 w-10 h-10 rounded-full object-cover transition-all duration-300 ${
                index === current ? "opacity-100" : "opacity-70 group-hover:opacity-90"
              }`}
            />
            
            <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap transition-all duration-200 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}>
              {images[index].title}
            </div>
          </button>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all duration-300 ease-linear"
          style={{ 
            width: `${((current + 1) / images.length) * 100}%`,
            animation: isPlaying ? 'none' : 'none'
          }}
        />
      </div>

      <div className={`absolute top-6 left-6 bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-full transition-all duration-300 ${
        isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
      }`}>
        <span className="text-lg font-semibold">{current + 1}</span>
        <span className="text-sm text-gray-300 mx-1">/</span>
        <span className="text-sm text-gray-300">{images.length}</span>
      </div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl" />
        <div className="absolute bottom-20 left-8 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-lg" />
      </div>
    </div>
  );
};

// ==================== Feature Card ====================
const FeatureCard = ({ icon: Icon, title, description, delay = 0, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-slide-up overflow-hidden border border-gray-100 cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="p-8">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-100 to-red-100 rounded-2xl mb-6 group-hover:from-rose-200 group-hover:to-red-200 transition-all duration-300">
          <Icon className={`h-8 w-8 text-rose-600 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-rose-700 transition-colors">{title}</h3>
        <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
        <div className="flex items-center text-rose-600 hover:text-rose-800 font-semibold group">
          <span className="mr-2">Learn more</span>
          <ChevronRight size={20} className={`transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
        </div>
      </div>
      <div className={`h-1 bg-gradient-to-r from-rose-500 to-red-600 transform origin-left transition-transform duration-500 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`} />
    </div>
  );
};

// ==================== Main Content ====================
const MainContent = ({ onPageChange }) => {
  const features = [
    { 
      icon: BookOpen, 
      title: "Academic Excellence", 
      description: "World-renowned faculty and cutting-edge curriculum designed to prepare you for tomorrow's challenges with innovative teaching methods.",
      onClick: () => onPageChange('programs')
    },
    { 
      icon: Users, 
      title: "Vibrant Community", 
      description: "Join a diverse community of students, researchers, and innovators from around the globe, fostering lifelong connections.",
      onClick: () => onPageChange('student-life')
    },
    { 
      icon: Globe, 
      title: "Global Opportunities", 
      description: "Study abroad programs, international partnerships, and global career placement services to expand your horizons.",
      onClick: () => onPageChange('global')
    },
    { 
      icon: Microscope, 
      title: "Research Innovation", 
      description: "State-of-the-art facilities and groundbreaking research opportunities across all disciplines with cutting-edge technology.",
      onClick: () => onPageChange('research')
    },
    { 
      icon: Award, 
      title: "Career Success", 
      description: "Comprehensive career services and strong alumni network to launch your professional journey with confidence.",
      onClick: () => alert('Explore career opportunities and placement services!')
    },
    { 
      icon: Leaf, 
      title: "Sustainability Focus", 
      description: "Leading the way in environmental responsibility and sustainable campus practices for a better tomorrow.",
      onClick: () => onPageChange('sustainability')
    }
  ];

  return (
    <div className="bg-gray-50">
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-rose-100 to-red-100 rounded-full px-6 py-2 text-rose-700 text-sm font-semibold mb-4">
              Campus Life
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Experience Our Campus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a visual journey through our beautiful campus and see where your future unfolds.
            </p>
          </div>
          <ImageCarousel />
        </div>
      </div>
      
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-rose-100 to-red-100 rounded-full px-6 py-2 text-rose-700 text-sm font-semibold mb-4">
              Excellence in Education
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose UEP?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes our university a leader in higher education and student success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
                onClick={feature.onClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== Sustainable Development Goals Section ====================
const SustainableDevelopmentGoals = ({ sdgDocuments, isAdmin, onUpload, onDeleteDocument, onEditDocument }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showManagement, setShowManagement] = useState(false);
  const [showDatabaseManagement, setShowDatabaseManagement] = useState(false);
  const [hoveredGoal, setHoveredGoal] = useState(null);
  const [showGoalDialog, setShowGoalDialog] = useState(null);
  const [viewingDocument, setViewingDocument] = useState(null);
  const [showFileViewer, setShowFileViewer] = useState(false);

  const sdgGoals = [
    { 
      number: 1, 
      title: "No Poverty", 
      color: "bg-red-500", 
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: "🏠",
      description: "End poverty in all its forms everywhere by 2030. This goal aims to ensure social protection for the poor and vulnerable, and equal access to economic resources."
    },
    { 
      number: 2, 
      title: "Zero Hunger", 
      color: "bg-yellow-500", 
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      icon: "🍎",
      description: "End hunger, achieve food security and improved nutrition, and promote sustainable agriculture. Ensure access to safe, nutritious food for all."
    },
    { 
      number: 3, 
      title: "Good Health", 
      color: "bg-green-500", 
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: "❤️",
      description: "Ensure healthy lives and promote well-being for all at all ages. Reduce maternal mortality, end preventable deaths of newborns and children."
    },
    { 
      number: 4, 
      title: "Quality Education", 
      color: "bg-red-500", 
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: "📚",
      description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. Build and upgrade education facilities."
    },
    { 
      number: 5, 
      title: "Gender Equality", 
      color: "bg-yellow-500", 
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      icon: "⚖️",
      description: "Achieve gender equality and empower all women and girls. End discrimination, violence, and harmful practices against women and girls."
    },
    { 
      number: 6, 
      title: "Clean Water", 
      color: "bg-blue-500", 
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: "💧",
      description: "Ensure availability and sustainable management of water and sanitation for all. Improve water quality and protect water-related ecosystems."
    },
    { 
      number: 7, 
      title: "Clean Energy", 
      color: "bg-yellow-500", 
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      icon: "⚡",
      description: "Ensure access to affordable, reliable, sustainable and modern energy for all. Increase share of renewable energy and energy efficiency."
    },
    { 
      number: 8, 
      title: "Economic Growth", 
      color: "bg-red-500", 
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: "📈",
      description: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all."
    },
    { 
      number: 9, 
      title: "Innovation", 
      color: "bg-orange-500", 
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      icon: "🏭",
      description: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation. Enhance scientific research and technological capabilities."
    },
    { 
      number: 10, 
      title: "Reduced Inequality", 
      color: "bg-red-500", 
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: "⚖️",
      description: "Reduce inequality within and among countries. Empower and promote social, economic and political inclusion of all."
    },
    { 
      number: 11, 
      title: "Sustainable Cities", 
      color: "bg-yellow-500", 
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      icon: "🏙️",
      description: "Make cities and human settlements inclusive, safe, resilient and sustainable. Provide access to safe and affordable housing and basic services."
    },
    { 
      number: 12, 
      title: "Responsible Consumption", 
      color: "bg-amber-700", 
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      icon: "🔄",
      description: "Ensure sustainable consumption and production patterns. Achieve sustainable management and efficient use of natural resources."
    },
    { 
      number: 13, 
      title: "Climate Action", 
      color: "bg-green-500", 
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: "🌍",
      description: "Take urgent action to combat climate change and its impacts. Strengthen resilience and adaptive capacity to climate-related hazards."
    },
    { 
      number: 14, 
      title: "Life Below Water", 
      color: "bg-blue-500", 
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: "🐠",
      description: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development. Reduce marine pollution and ocean acidification."
    },
    { 
      number: 15, 
      title: "Life on Land", 
      color: "bg-green-500", 
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: "🌳",
      description: "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt biodiversity loss."
    },
    { 
      number: 16, 
      title: "Peace & Justice", 
      color: "bg-blue-500", 
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: "🕊️",
      description: "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable institutions."
    },
    { 
      number: 17, 
      title: "Partnerships", 
      color: "bg-blue-500", 
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: "🤝",
      description: "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development. Enhance international cooperation."
    }
  ];

  useEffect(() => {
    let timer;
    if (hoveredGoal) {
      timer = setTimeout(() => {
        const goal = sdgGoals.find(g => g.number === hoveredGoal);
        setShowGoalDialog(goal);
      }, 400);
    } else {
      timer = setTimeout(() => {
        setShowGoalDialog(null);
      }, 300);
    }
    return () => clearTimeout(timer);
  }, [hoveredGoal]);

  const handleViewDocument = (document) => {
    setViewingDocument(document);
    setShowFileViewer(true);
  };

  const handleUpload = async (newDocument) => {
    try {
      const savedDocument = await sdgDatabase.addDocument(newDocument);
      onUpload(savedDocument);
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Error uploading document. Please try again.');
    }
  };

  const handleDelete = async (docId) => {
    try {
      await sdgDatabase.deleteDocument(docId);
      onDeleteDocument(docId);
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Error deleting document. Please try again.');
    }
  };

  const handleEdit = async (docId, updates) => {
    try {
      const updatedDocument = await sdgDatabase.updateDocument(docId, updates);
      if (updatedDocument) {
        onEditDocument(docId, updates);
      }
    } catch (error) {
      console.error('Error updating document:', error);
      alert('Error updating document. Please try again.');
    }
  };

  const handleDataRefresh = () => {
    console.log('Data refreshed from database');
  };

  // File Viewer Modal Component
  const FileViewerModal = ({ isOpen, onClose, document }) => {
    if (!isOpen || !document) return null;

    const getFileType = (fileName) => {
      const ext = fileName.split('.').pop()?.toLowerCase();
      if (['pdf'].includes(ext)) return 'pdf';
      if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image';
      if (['doc', 'docx'].includes(ext)) return 'document';
      if (['xls', 'xlsx'].includes(ext)) return 'spreadsheet';
      return 'other';
    };

    const renderFilePreview = () => {
      const fileType = getFileType(document.fileName);
      
      switch (fileType) {
        case 'pdf':
          return (
            <div className="w-full h-96 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
              <FileText className="w-16 h-16 text-red-500 mb-4" />
              <p className="text-gray-600 mb-4">PDF Document</p>
              <a
                href={document.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Open PDF in New Tab
              </a>
            </div>
          );
        
        case 'image':
          return (
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center p-4">
              <img
                src={document.fileUrl}
                alt={document.title}
                className="max-w-full max-h-full object-contain rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = e.target.parentElement.querySelector('.image-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="image-fallback hidden flex-col items-center justify-center">
                <Image className="w-16 h-16 text-blue-500 mb-4" />
                <p className="text-gray-600 mb-4">Image Preview Not Available</p>
                <a
                  href={document.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  View Image in New Tab
                </a>
              </div>
            </div>
          );
        
        default:
          return (
            <div className="w-full h-64 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
              <FileText className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">Preview not available for this file type</p>
              <p className="text-gray-500 text-sm mb-4">Please download the file to view its contents</p>
              <a
                href={document.fileUrl}
                download={document.fileName}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center"
              >
                <Download size={16} className="mr-2" />
                Download File
              </a>
            </div>
          );
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{document.title}</h3>
              <p className="text-gray-600 text-sm">{document.fileName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6 overflow-auto max-h-[calc(90vh-200px)]">
            {renderFilePreview()}
            
            {(document.description || document.tags?.length > 0) && (
              <div className="mt-6 space-y-4">
                {document.description && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-700">{document.description}</p>
                  </div>
                )}
                
                {document.tags && document.tags.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {document.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <div className="text-sm text-gray-600">
                <p>Uploaded: {document.uploadDate}</p>
                <p>Size: {document.fileSize} MB</p>
              </div>
              <div className="flex gap-3">
                <a
                  href={document.fileUrl}
                  download={document.fileName}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center"
                >
                  <Download size={16} className="mr-2" />
                  Download
                </a>
                <button
                  onClick={onClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Admin Upload Modal Component
  const AdminUploadModal = ({ isOpen, onClose, onUpload }) => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      file: null,
      tags: []
    });
    const [tagInput, setTagInput] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.file) {
        alert('Please select a file to upload');
        return;
      }

      const newDocument = {
        id: Date.now().toString(),
        title: formData.title || formData.file.name,
        description: formData.description,
        fileName: formData.file.name,
        fileSize: (formData.file.size / (1024 * 1024)).toFixed(2),
        fileUrl: URL.createObjectURL(formData.file),
        uploadDate: new Date().toLocaleDateString(),
        tags: formData.tags
      };

      onUpload(newDocument);
      setFormData({ title: '', description: '', file: null, tags: [] });
      onClose();
    };

    const addTag = () => {
      if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
        setTagInput('');
      }
    };

    const removeTag = (tagToRemove) => {
      setFormData(prev => ({
        ...prev,
        tags: prev.tags.filter(tag => tag !== tagToRemove)
      }));
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Upload Document</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter document title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter document description"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File
              </label>
              <input
                type="file"
                onChange={(e) => setFormData(prev => ({ ...prev, file: e.target.files[0] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter tag and press Enter"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-green-600 hover:text-green-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </form>
          
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex gap-3 justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <Upload size={16} className="mr-2" />
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Document Management Component
  const DocumentManagement = ({ sdgDocuments, onDeleteDocument, onEditDocument, onViewDocument }) => {
    const [editingDoc, setEditingDoc] = useState(null);
    const [editForm, setEditForm] = useState({});

    const handleEdit = (doc) => {
      setEditingDoc(doc.id);
      setEditForm({
        title: doc.title,
        description: doc.description,
        tags: doc.tags || []
      });
    };

    const handleSave = (docId) => {
      onEditDocument(docId, editForm);
      setEditingDoc(null);
      setEditForm({});
    };

    const handleCancel = () => {
      setEditingDoc(null);
      setEditForm({});
    };

    return (
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
        <h4 className="text-xl font-bold text-gray-900 mb-4">Document Management</h4>
        <div className="space-y-4">
          {sdgDocuments.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              {editingDoc === doc.id ? (
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={2}
                    className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(doc.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900">{doc.title}</h5>
                    <p className="text-sm text-gray-600">{doc.description}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span>{doc.fileName}</span>
                      <span>{doc.fileSize} MB</span>
                      <span>{doc.uploadDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewDocument(doc)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleEdit(doc)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteDocument(doc.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Database Management Component
  const DatabaseManagement = ({ isOpen, onClose, documents, onDataChange }) => {
    if (!isOpen) return null;

    const handleExport = () => {
      const dataStr = JSON.stringify(documents, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sdg-documents-backup.json';
      link.click();
      URL.revokeObjectURL(url);
    };

    const handleImport = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedData = JSON.parse(e.target.result);
            console.log('Imported data:', importedData);
            alert('Data imported successfully! Check console for details.');
            onDataChange();
          } catch (error) {
            alert('Error importing data: Invalid JSON format');
          }
        };
        reader.readAsText(file);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Database Management</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6 space-y-6 overflow-auto max-h-[calc(80vh-140px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Export Data</h4>
                <p className="text-blue-700 text-sm mb-3">Download all documents data as JSON backup</p>
                <button
                  onClick={handleExport}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Download size={16} className="mr-2" />
                  Export Data
                </button>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Import Data</h4>
                <p className="text-green-700 text-sm mb-3">Upload JSON file to import documents data</p>
                <label className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center cursor-pointer">
                  <Upload size={16} className="mr-2" />
                  Import Data
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Database Statistics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{documents.length}</div>
                  <div className="text-sm text-gray-600">Total Documents</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {new Set(documents.map(doc => doc.fileName.split('.').pop())).size}
                  </div>
                  <div className="text-sm text-gray-600">File Types</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {documents.reduce((total, doc) => total + parseFloat(doc.fileSize || 0), 0).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Total Size (MB)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {new Set(documents.flatMap(doc => doc.tags || [])).size}
                  </div>
                  <div className="text-sm text-gray-600">Unique Tags</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <button
              onClick={onClose}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Close Database Management
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative bg-white py-24 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-green-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-green-100 to-blue-100 rounded-full px-6 py-2 text-green-700 text-sm font-semibold mb-4">
            Global Commitment
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sustainable Development Goals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            UEP is committed to advancing the United Nations Sustainable Development Goals 
            through education, research, and community engagement.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4 mb-16">
          {sdgGoals.map((goal) => (
            <div
              key={goal.number}
              className={`group relative ${goal.bgColor} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border ${goal.borderColor} p-4 text-center cursor-pointer min-h-[120px] flex flex-col items-center justify-center`}
              onMouseEnter={() => setHoveredGoal(goal.number)}
              onMouseLeave={() => setHoveredGoal(null)}
            >
              <div className={`w-12 h-12 ${goal.color} rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-2 transition-all duration-300 group-hover:scale-110`}>
                <span className="text-lg">{goal.icon}</span>
              </div>
              
              <p className="text-xs text-gray-700 font-semibold leading-tight mb-1">
                {goal.title}
              </p>
              
              <div className="text-xs text-gray-500 font-medium">
                Goal {goal.number}
              </div>

              <div className={`absolute bottom-2 w-6 h-1 ${goal.color} rounded-full transition-all duration-300 ${
                hoveredGoal === goal.number ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}></div>
            </div>
          ))}
        </div>

        {showGoalDialog && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50 pointer-events-none"
            onMouseEnter={() => setHoveredGoal(null)}
          >
            <div 
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-auto transform pointer-events-auto"
              onMouseEnter={() => setHoveredGoal(showGoalDialog.number)}
              onMouseLeave={() => setHoveredGoal(null)}
            >
              <div className={`${showGoalDialog.bgColor} ${showGoalDialog.borderColor} border-b rounded-t-3xl p-6`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${showGoalDialog.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    {showGoalDialog.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {showGoalDialog.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Goal {showGoalDialog.number}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl">{showGoalDialog.icon}</span>
                </div>
                <p className="text-gray-700 leading-relaxed text-center">
                  {showGoalDialog.description}
                </p>
              </div>
              
              <div className="border-t border-gray-200 p-6">
                <button
                  onClick={() => {
                    setShowGoalDialog(null);
                    setHoveredGoal(null);
                    alert(`Learn about our initiatives for ${showGoalDialog.title}`);
                  }}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Learn More About This Goal
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                SDG Resources & Documents
              </h3>
              <p className="text-gray-600">
                Access our latest reports, research, and initiatives related to sustainable development.
              </p>
            </div>
            
            {isAdmin && (
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0">
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  <Upload size={20} className="mr-2" />
                  Upload Document
                </button>
                <button
                  onClick={() => setShowManagement(!showManagement)}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  <FileText size={20} className="mr-2" />
                  Manage Documents
                </button>
                <button
                  onClick={() => setShowDatabaseManagement(true)}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  <Database size={20} className="mr-2" />
                  Database
                </button>
              </div>
            )}
          </div>

          {sdgDocuments.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sdgDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-200 overflow-hidden group"
                >
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4">
                    <div className="flex items-center justify-between">
                      <FileText className="w-6 h-6 text-white" />
                      <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                        {doc.fileSize} MB
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors line-clamp-2">
                      {doc.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {doc.description || 'No description provided.'}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        {doc.uploadDate}
                      </span>
                      <span className="flex items-center">
                        <FileText size={12} className="mr-1" />
                        {doc.fileName.split('.').pop()?.toUpperCase()}
                      </span>
                    </div>
                    {doc.tags && doc.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {doc.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {doc.tags.length > 3 && (
                          <span className="text-gray-500 text-xs">+{doc.tags.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDocument(doc)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center text-sm"
                      >
                        <Eye size={14} className="mr-1" />
                        View
                      </button>
                      <a
                        href={doc.fileUrl}
                        download={doc.fileName}
                        className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center text-sm"
                      >
                        <Download size={14} className="mr-1" />
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-600 mb-2">
                No Documents Available
              </h4>
              <p className="text-gray-500">
                {isAdmin 
                  ? 'Upload the first SDG document to get started.' 
                  : 'Check back later for SDG resources and documents.'
                }
              </p>
            </div>
          )}

          {isAdmin && showManagement && (
            <DocumentManagement 
              sdgDocuments={sdgDocuments}
              onDeleteDocument={handleDelete}
              onEditDocument={handleEdit}
              onViewDocument={handleViewDocument}
            />
          )}
        </div>
      </div>

      <AdminUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUpload}
      />

      <FileViewerModal
        isOpen={showFileViewer}
        onClose={() => {
          setShowFileViewer(false);
          setViewingDocument(null);
        }}
        document={viewingDocument}
      />

      <DatabaseManagement
        isOpen={showDatabaseManagement}
        onClose={() => setShowDatabaseManagement(false)}
        documents={sdgDocuments}
        onDataChange={handleDataRefresh}
      />
    </div>
  );
};

// ==================== Contact Us ====================
const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    originSchool: "",
    facebook: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert("Form submitted! ✅ " + JSON.stringify(form, null, 2));
    setIsSubmitting(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      originSchool: "",
      facebook: ""
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-red-500/10 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-red-600/10 rounded-full animate-pulse-medium"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-red-400/10 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/5 rounded-full animate-pulse-medium"></div>
      </div>

      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${15 + Math.random() * 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 text-red-200 text-sm font-semibold mb-6 border border-white/10">
            <MapPin className="w-4 h-4 mr-2" />
            Visit Our Campus
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-red-200">
            Get In Touch With Us
          </h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto leading-relaxed">
            Experience the future of aviation education firsthand. Visit us from{" "}
            <strong>Monday to Saturday, 8am to 4pm</strong> for an exclusive tour
            of our facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 h-full border border-white/10 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-red-300" />
                Visit Us
              </h3>
              <p className="mb-8 text-red-100">
                Come see our state-of-the-art facilities and experience the Aerotropolis difference.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Clock className="w-5 h-5 mr-3 mt-1 text-red-300 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Opening Hours</h4>
                    <p className="text-red-100">Monday - Saturday: 8am - 4pm</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 mt-1 text-red-300 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Call Us</h4>
                    <p className="text-red-100">+1 (234) 567-8900</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 mt-1 text-red-300 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Email Us</h4>
                    <p className="text-red-100">info@aerotropolis.edu</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/10">
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {[
                    { name: "Facebook", icon: Facebook, onClick: () => alert('Visit our Facebook page!') },
                    { name: "Twitter", icon: Twitter, onClick: () => alert('Follow us on Twitter!') },
                    { name: "Instagram", icon: Instagram, onClick: () => alert('Follow us on Instagram!') },
                    { name: "LinkedIn", icon: ExternalLink, onClick: () => alert('Connect with us on LinkedIn!') }
                  ].map((social) => (
                    <button
                      key={social.name}
                      onClick={social.onClick}
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      <social.icon className="w-5 h-5 text-red-300" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-2">Schedule a Visit</h3>
              <p className="text-red-100 mb-8">
                Fill out the form below and we'll get back to you shortly
              </p>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-red-100 group-focus-within:text-white transition-colors">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all duration-300 shadow-lg"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-red-100 group-focus-within:text-white transition-colors">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all duration-300 shadow-lg"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-red-100 group-focus-within:text-white transition-colors">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all duration-300 shadow-lg"
                    placeholder="+1 (234) 567-8900"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-red-100 group-focus-within:text-white transition-colors">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all duration-300 shadow-lg"
                    placeholder="Your complete address"
                  />
                </div>

                <div className="group md:col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-red-100 group-focus-within:text-white transition-colors">
                    Current/Previous School
                  </label>
                  <input
                    type="text"
                    name="originSchool"
                    value={form.originSchool}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all duration-300 shadow-lg"
                    placeholder="School or institution name"
                  />
                </div>

                <div className="group md:col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-red-100 group-focus-within:text-white transition-colors">
                    Social Media Profile (Optional)
                  </label>
                  <input
                    type="text"
                    name="facebook"
                    value={form.facebook}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all duration-300 shadow-lg"
                    placeholder="Facebook, Instagram, or Twitter profile"
                  />
                </div>

                <div className="md:col-span-2 flex justify-center mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group flex items-center justify-center space-x-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-10 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300 ${
                      isSubmitting ? "opacity-80 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Request</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.05);
          }
        }
        @keyframes pulse-medium {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.03);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
        .animate-pulse-medium {
          animation: pulse-medium 6s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

// ==================== News & Events ====================
const NewsAndEvents = () => {
  const events = [
    {
      id: 1,
      title: "UEP Takes Part in Tree Planting at HCU Conference",
      date: "March 15, 2025",
      description:
        "UEP takes part in tree planting at the 12th HCU National and International Academic Conference in Thailand.",
      image: "https://source.unsplash.com/600x400/?tree-planting,thailand",
      category: "International",
    },
    {
      id: 2,
      title: "UEP-CTE Competency-Based Training",
      date: "March 10, 2025",
      description:
        "The UEP-CTE participated in the CHED-funded Competency-Based Training for Teacher Educators.",
      image: "https://source.unsplash.com/600x400/?education,training",
      category: "Education",
    },
    {
      id: 3,
      title: "UEP Holds Groundbreaking Ceremony for 7-Storey Building",
      date: "February 27, 2025",
      description:
        "UEP marks a milestone with the groundbreaking of its new 7-storey academic building, symbolizing growth and progress.",
      image: "https://source.unsplash.com/600x400/?construction,ceremony",
      category: "Campus Development",
    },
    {
      id: 4,
      title: "Clean-Up Drive at Tagamusing River",
      date: "February 18, 2025",
      description:
        "A collective effort for a cleaner tomorrow as UEP joins hands for a clean-up drive at Tagamusing River.",
      image: "https://source.unsplash.com/600x400/?river,cleanup",
      category: "Community Service",
    },
    {
      id: 5,
      title:
        "UEP Attends Joint Oath Taking of New Midwives and IMAP Members",
      date: "February 10, 2025",
      description:
        "UEP attended the joint oath taking and induction ceremonies of new midwives and IMAP members, receiving the Top Performing School Award.",
      image: "https://source.unsplash.com/600x400/?midwives,health",
      category: "Achievement",
    },
    {
      id: 6,
      title: "UEP-CTE Workshop and Culminating Activity for Pre-Service Teachers",
      date: "January 28, 2025",
      description:
        "Pre-service teachers showcased their learning through workshops and culminating activities organized by UEP-CTE.",
      image: "https://source.unsplash.com/600x400/?teachers,workshop",
      category: "Education",
    },
    {
      id: 7,
      title: "UEP Research Finds Pangasinan Language Endangered",
      date: "January 22, 2025",
      description:
        'UEP research finds that Pangasinan is at "risk of being an endangered language," highlighting the importance of cultural preservation.',
      image: "https://source.unsplash.com/600x400/?language,philippines",
      category: "Research",
    },
    {
      id: 8,
      title: "Business Incubation: Innovate to Elevate",
      date: "January 15, 2025",
      description:
        "‘Innovate to Elevate’ sparks an entrepreneurial mindset among students through UEP’s business incubation initiatives.",
      image: "https://source.unsplash.com/600x400/?entrepreneurship,students",
      category: "Entrepreneurship",
    },
    {
      id: 9,
      title: "UEP Brings PROJECT S.H.E.L.P 2.0 to Life in Sta. Catalina",
      date: "December 18, 2024",
      description:
        "PROJECT S.H.E.L.P 2.0 brings outreach and livelihood support to Sta. Catalina, strengthening community engagement.",
      image: "https://source.unsplash.com/600x400/?community,outreach",
      category: "Outreach",
    },
    {
      id: 10,
      title: "Summer Party: Seas the Moment",
      date: "December 12, 2024",
      description:
        'College of Hospitality Management students held a "Summer Party: Seas the Moment" cocktail event as a midterm laboratory.',
      image: "https://source.unsplash.com/600x400/?cocktail,event",
      category: "Hospitality",
    },
    {
      id: 11,
      title: "Criminology Week 2025",
      date: "December 5, 2024",
      description:
        "Criminology students compete in different sports — showcasing sportsmanship and school spirit during Criminology Week 2025.",
      image: "https://source.unsplash.com/600x400/?sports,criminology",
      category: "Student Life",
    },
    {
      id: 12,
      title: "Congratulations to the February 2025 Criminology Board Passers",
      date: "November 28, 2024",
      description:
        "UEP congratulates the February 2025 Criminologists Licensure Examination passers for their outstanding achievements.",
      image: "https://source.unsplash.com/600x400/?graduation,success",
      category: "Achievement",
    },
    {
      id: 13,
      title: "Strengthening Students with Academics and Entrepreneurship",
      date: "November 15, 2024",
      description:
        "UEP promotes holistic learning by combining academics with entrepreneurship to prepare students for real-world success.",
      image: "https://source.unsplash.com/600x400/?students,learning",
      category: "Development",
    },
    {
      id: 14,
      title: "UEP Sets Another Voyage Back to Indonesia",
      date: "October 30, 2024",
      description:
        "UEP continues its international collaboration through another academic and cultural voyage to Indonesia.",
      image: "https://source.unsplash.com/600x400/?indonesia,travel",
      category: "International",
    },
    {
      id: 15,
      title: "Hello, Vietnam, Again!",
      date: "October 12, 2024",
      description:
        "UEP once again embarks on an enriching academic journey to Vietnam, strengthening cross-cultural ties.",
      image: "https://source.unsplash.com/600x400/?vietnam,culture",
      category: "International",
    },
    {
      id: 16,
      title: "UEP Participants at Virtual CommTECH Nusantara 2025",
      date: "October 5, 2024",
      description:
        "UEP’s official participants embark on an unforgettable experience at Virtual CommTECH Nusantara 2025.",
      image: "https://source.unsplash.com/600x400/?virtual,conference",
      category: "International",
    },
    {
      id: 17,
      title: "CommTECH Nusantara 2025: Virtual Exploration of Indonesia",
      date: "September 20, 2024",
      description:
        "A virtual exploration of Indonesia through the CommTECH Nusantara 2025 program enriches global awareness among UEP students.",
      image: "https://source.unsplash.com/600x400/?indonesia,technology",
      category: "Cultural Exchange",
    },
    {
      id: 18,
      title: "UEP Delegates at FPT Winter Camp 2024",
      date: "September 5, 2024",
      description:
        "UEP delegates share their remarkable journey at FPT Winter Camp 2024: Xin Chao Viet Nam.",
      image: "https://source.unsplash.com/600x400/?winter,camp",
      category: "International",
    },
    {
      id: 19,
      title: "UEP Delegates Reflect on CommTECH NUSANTARA Experience",
      date: "August 30, 2024",
      description:
        "UEP delegates reflect on their journey from CommTECH NUSANTARA: Building resilient communities and promoting interreligious harmony in Java.",
      image: "https://source.unsplash.com/600x400/?java,island",
      category: "Cultural Exchange",
    },
  ];

  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleEvents, setVisibleEvents] = useState(6);

  const loadMoreEvents = () => setVisibleEvents((prev) => prev + 6);

  return (
    <div className="relative bg-white py-24 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-rose-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-red-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-rose-100 to-red-100 rounded-full px-6 py-2 text-rose-700 text-sm font-semibold mb-4">
            Stay Connected
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            News & Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest happenings, events, and announcements
            at UEP.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, visibleEvents).map((event, index) => (
            <div
              key={event.id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:scale-105 cursor-pointer"
              onMouseEnter={() => setHoveredCard(event.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-rose-600 to-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {event.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-8">
                <div className="flex items-center mb-3">
                  <div className="w-2 h-2 bg-rose-500 rounded-full mr-2"></div>
                  <p className="text-sm text-rose-600 font-semibold">
                    {event.date}
                  </p>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-rose-700 transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {event.description}
                </p>
                <button className="flex items-center text-rose-600 font-semibold hover:text-rose-800 transition-colors group">
                  <span className="mr-2">Read More</span>
                  <ChevronRight
                    size={16}
                    className={`transition-transform duration-300 ${
                      hoveredCard === event.id ? "translate-x-2" : ""
                    }`}
                  />
                </button>
              </div>

              <div
                className={`h-1 bg-gradient-to-r from-rose-500 to-red-600 transform origin-left transition-transform duration-500 ${
                  hoveredCard === event.id ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </div>
          ))}
        </div>

        {visibleEvents < events.length ? (
          <div className="text-center mt-16">
            <button
              onClick={loadMoreEvents}
              className="bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Load More Events ({events.length - visibleEvents} remaining)
            </button>
          </div>
        ) : (
          <div className="text-center mt-16">
            <button
              onClick={() => alert("View all upcoming events!")}
              className="bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              View All Events
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== Footer ====================
const Footer = ({ onPageChange }) => {
  return (
    <footer className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 text-gray-300 pt-20 pb-8 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="md:col-span-2">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-3 rounded-xl shadow-lg">
              <BookOpen className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-white">University of Eastern Pangasinan</h3>
              <p className="text-red-200 text-sm">Aeronautical & Technological College</p>
            </div>
          </div>
          <p className="text-gray-400 leading-relaxed mb-6">
            The University of Eastern Pangasinan (UEP) is dedicated to shaping the future
            of learners through academic excellence, innovation, and hands-on experience.  
            Located in Binalonan, Pangasinan, UEP is a hub of opportunities and growth,
            preparing students for global competitiveness.
          </p>
          <div className="flex space-x-4">
            {[
              { icon: Facebook, onClick: () => alert('Visit our Facebook page') },
              { icon: Twitter, onClick: () => alert('Follow us on Twitter') },
              { icon: Instagram, onClick: () => alert('Follow us on Instagram') }
            ].map((social, index) => (
              <button
                key={index}
                onClick={social.onClick}
                className="bg-red-600/20 hover:bg-red-600 p-3 rounded-xl transition-all duration-300 group"
              >
                <social.icon className="w-5 h-5 text-red-300 group-hover:text-white" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-white mb-6">Quick Links</h4>
          <ul className="space-y-3">
            {[
              { name: 'About UEP', page: 'about' },
              { name: 'Admissions', page: 'apply' },
              { name: 'Academics', page: 'programs' },
              { name: 'News & Events', page: 'events' },
              { name: 'Contact Us', page: 'contact' }
            ].map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => onPageChange(link.page)}
                  className="text-gray-400 hover:text-red-300 transition-colors duration-300 flex items-center group w-full text-left"
                >
                  <ChevronRight size={16} className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-white mb-6">Contact Information</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 group">
              <MapPin className="w-5 h-5 text-red-400 mt-1 group-hover:text-red-300 transition-colors" />
              <div>
                <p className="text-white font-medium">Main Campus</p>
                <p className="text-gray-400 text-sm">University of Eastern Pangasinan<br />Binalonan, Pangasinan, Philippines</p>
              </div>
            </li>
            <li className="flex items-center gap-3 group">
              <Phone className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
              <div>
                <button onClick={() => alert('Call Binalonan campus')} className="text-gray-400 hover:text-red-300 transition-colors">
                  Binalonan: 0927 440 8826
                </button>
                <br />
                <button onClick={() => alert('Call North Manila campus')} className="text-gray-400 hover:text-red-300 transition-colors">
                  North Manila: 0917 112 8724
                </button>
              </div>
            </li>
            <li className="flex items-center gap-3 group">
              <Mail className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
              <button onClick={() => alert('Send email to UEP')} className="text-gray-400 hover:text-red-300 transition-colors">
                info@uep.edu.com
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10 mt-16 pt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} University of Eastern Pangasinan. All Rights Reserved.</p>
          <p className="text-red-300 text-sm mt-2 md:mt-0">Developed with ❤️ for the future leaders of Pangasinan.</p>
        </div>
      </div>
    </footer>
  );
};

// ==================== Dynamic Page Content ====================
const DynamicPageContent = ({ currentPage }) => {
  const pageContents = {
    home: {
      title: "Welcome to UEP",
      content: "Your journey to excellence starts here at the University of Eastern Pangasinan."
    },
    programs: {
      title: "Academic Programs",
      content: "Explore our wide range of undergraduate, graduate, and online programs designed for your success."
    },
    'student-life': {
      title: "Student Life",
      content: "Experience vibrant campus life with numerous organizations, facilities, and housing options."
    },
    global: {
      title: "Global Opportunities",
      content: "Expand your horizons with international programs and study abroad opportunities."
    },
    alumni: {
      title: "Alumni Network",
      content: "Connect with our global alumni community and stay engaged with UEP."
    },
    research: {
      title: "Research & Innovation",
      content: "Discover groundbreaking research and innovation across all disciplines."
    },
    sustainability: {
      title: "Sustainability Initiatives",
      content: "Learn about our commitment to sustainable development and environmental responsibility."
    },
    about: {
      title: "About UEP",
      content: "Discover our history, leadership, and commitment to educational excellence."
    },
    apply: {
      title: "Admissions",
      content: "Start your application process and join the UEP community today."
    },
    enroll: {
      title: "Enrollment",
      content: "Complete your enrollment and begin your educational journey with us."
    }
  };

  const page = pageContents[currentPage] || pageContents.home;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-24 pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
          {page.title}
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          {page.content}
        </p>
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Page Under Development
          </h2>
          <p className="text-gray-600 mb-8">
            This page is currently under development. Please check back later for more content and functionality.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Return to Top
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== App ====================
const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [sdgDocuments, setSdgDocuments] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const loadData = async () => {
      const savedAdminStatus = localStorage.getItem('uep_admin_status');
      const savedCurrentPage = localStorage.getItem('uep_current_page');
      
      if (savedAdminStatus === 'true') {
        setIsAdmin(true);
      }
      
      try {
        const documents = await sdgDatabase.getAllDocuments();
        setSdgDocuments(documents);
      } catch (error) {
        console.error('Error loading documents:', error);
      }

      if (savedCurrentPage) {
        setCurrentPage(savedCurrentPage);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('uep_admin_status', isAdmin.toString());
  }, [isAdmin]);

  useEffect(() => {
    localStorage.setItem('uep_current_page', currentPage);
  }, [currentPage]);

  const handleAdminChange = (adminStatus) => {
    setIsAdmin(adminStatus);
  };

  const handleSdgUpload = (newDocument) => {
    setSdgDocuments(prev => [newDocument, ...prev]);
  };

  const handleDeleteDocument = (docId) => {
    setSdgDocuments(prev => prev.filter(doc => doc.id !== docId));
  };

  const handleEditDocument = (docId, newData) => {
    setSdgDocuments(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, ...newData } : doc
    ));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExplorePrograms = () => {
    handlePageChange('programs');
  };

  const handleVirtualTour = () => {
    alert('Starting virtual tour experience! This feature would show a 360° campus tour.');
  };

  const renderCurrentPage = () => {
    if (currentPage === 'home') {
      return (
        <>
          <HeroSection 
            onExplorePrograms={handleExplorePrograms}
            onVirtualTour={handleVirtualTour}
          />
          <MainContent onPageChange={handlePageChange} />
          <SustainableDevelopmentGoals 
            sdgDocuments={sdgDocuments}
            isAdmin={isAdmin}
            onUpload={handleSdgUpload}
            onDeleteDocument={handleDeleteDocument}
            onEditDocument={handleEditDocument}
          />
          <ContactUs />
          <NewsAndEvents />
        </>
      );
    } else {
      return <DynamicPageContent currentPage={currentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {showOnboarding && (
        <OnboardingAnimation onComplete={() => setShowOnboarding(false)} />
      )}
      
      <div className={showOnboarding ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <Navbar 
          isAdmin={isAdmin} 
          onAdminChange={handleAdminChange}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        {renderCurrentPage()}
        <Footer onPageChange={handlePageChange} />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delayed {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delayed {
          animation: fade-in-delayed 1s ease-out 0.5s both;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out both;
        }

        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #e11d48, #be123c);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #be123c);
        }
      `}</style>
    </div>
  );
};

export default App;